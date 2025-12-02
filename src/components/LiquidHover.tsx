import React, { useEffect, useRef } from 'react';
import { Renderer, Geometry, Program, Mesh, Vec2, Vec4, Flowmap, Texture } from 'ogl';

const LiquidHover: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // WebGL initialization
    const renderer = new Renderer({ dpr: 2, alpha: true });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    // Variable inputs to control flowmap
    let aspect = 1;
    const mouse = new Vec2(-1);
    const velocity = new Vec2();
    
    // Image dimensions (from the example)
    const _size = [2048, 1638];

    function resize() {
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      renderer.setSize(width, height);
      aspect = width / height;

      let a1, a2;
      const imageAspect = _size[1] / _size[0];
      if (height / width < imageAspect) {
        a1 = 1;
        a2 = height / width / imageAspect;
      } else {
        a1 = (width / height) * imageAspect;
        a2 = 1;
      }
      
      if (mesh) {
        mesh.program.uniforms.res.value = new Vec4(width, height, a1, a2);
      }
    }

    const flowmap = new Flowmap(gl, {
      falloff: 0.3,
      dissipation: 0.92,
      alpha: 0.5
    });

    // Triangle that includes -1 to 1 range for 'position', and 0 to 1 range for 'uv'.
    const geometry = new Geometry(gl, {
      position: {
        size: 2,
        data: new Float32Array([-1, -1, 3, -1, -1, 3])
      },
      uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) }
    });

    const texture = new Texture(gl, {
      minFilter: gl.LINEAR,
      magFilter: gl.LINEAR
    });
    
    const img = new Image();
    img.onload = () => (texture.image = img);
    img.crossOrigin = "Anonymous";
    img.src = "https://robindelaporte.fr/codepen/bg3.jpg";

    const vertex = `
      attribute vec2 uv;
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
      }
    `;

    const fragment = `
      precision highp float;
      precision highp int;
      uniform sampler2D tWater;
      uniform sampler2D tFlow;
      uniform float uTime;
      varying vec2 vUv;
      uniform vec4 res;

      void main() {
        // R and G values are velocity in the x and y direction
        // B value is the velocity length
        vec3 flow = texture2D(tFlow, vUv).rgb;

        vec2 uv = .5 * gl_FragCoord.xy / res.xy;
        
        vec2 myUV = (uv - vec2(0.5)) * res.zw + vec2(0.5);
        myUV -= flow.xy * (0.15 * 1.2);

        vec2 myUV2 = (uv - vec2(0.5)) * res.zw + vec2(0.5);
        myUV2 -= flow.xy * (0.125 * 1.2);

        vec2 myUV3 = (uv - vec2(0.5)) * res.zw + vec2(0.5);
        myUV3 -= flow.xy * (0.10 * 1.4);

        vec3 tex = texture2D(tWater, myUV).rgb;
        vec3 tex2 = texture2D(tWater, myUV2).rgb;
        vec3 tex3 = texture2D(tWater, myUV3).rgb;

        gl_FragColor = vec4(tex.r, tex2.g, tex3.b, 1.0);
      }
    `;

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        tWater: { value: texture },
        res: {
          value: new Vec4(window.innerWidth, window.innerHeight, 1, 1) // Initial value, updated in resize
        },
        tFlow: flowmap.uniform
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    // Initial resize
    resize();
    window.addEventListener("resize", resize, false);

    // Mouse handling
    let lastTime: number;
    const lastMouse = new Vec2();
    
    function updateMouse(e: MouseEvent | TouchEvent) {
      // @ts-ignore
      const x = e.changedTouches ? e.changedTouches[0].pageX : e.pageX;
      // @ts-ignore
      const y = e.changedTouches ? e.changedTouches[0].pageY : e.pageY;
      
      if (!container) return;
      const rect = container.getBoundingClientRect();
      // @ts-ignore
      const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
      // @ts-ignore
      const clientY = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;

      const relX = clientX - rect.left;
      const relY = clientY - rect.top;

      mouse.set(relX / rect.width, 1.0 - relY / rect.height);

      if (!lastTime) {
        lastTime = performance.now();
        lastMouse.set(relX, relY);
      }

      const deltaX = relX - lastMouse.x;
      const deltaY = relY - lastMouse.y;

      lastMouse.set(relX, relY);

      const time = performance.now();
      const delta = Math.max(10.4, time - lastTime);
      lastTime = time;
      
      velocity.x = deltaX / delta;
      velocity.y = deltaY / delta;
      (velocity as any).needsUpdate = true;
    }

    window.addEventListener("mousemove", updateMouse);
    window.addEventListener("touchstart", updateMouse);
    window.addEventListener("touchmove", updateMouse);

    let animationId: number;
    function update(t: number) {
      animationId = requestAnimationFrame(update);

      if (!(velocity as any).needsUpdate) {
        mouse.set(-1);
        velocity.set(0);
      }
      (velocity as any).needsUpdate = false;

      flowmap.aspect = aspect;
      flowmap.mouse.copy(mouse);
      flowmap.velocity.lerp(velocity, velocity.len() ? 0.15 : 0.1);
      flowmap.update();

      program.uniforms.uTime.value = t * 0.01;
      renderer.render({ scene: mesh });
    }
    
    animationId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", updateMouse);
      window.removeEventListener("touchstart", updateMouse);
      window.removeEventListener("touchmove", updateMouse);
      cancelAnimationFrame(animationId);
      if (container && gl.canvas && container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
    };
  }, []);

  return (
    <div className="relative w-full mix-blend-screen isolation-auto">
      {/* Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full z-0" />
      
      {/* SVG Mask Overlay */}
      <div className="relative z-10 w-full mix-blend-multiply bg-black flex items-center justify-center">
         <h1 
          className="leading-none font-black text-white uppercase tracking-tighter text-center select-none whitespace-nowrap"
          style={{ fontSize: '22vw' }}
        >
          Arnau Garcia
        </h1>
      </div>
    </div>
  );
};

export default LiquidHover;
