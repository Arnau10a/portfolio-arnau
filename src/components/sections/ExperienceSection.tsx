import React from 'react';
import { Anchor, Building2, GraduationCap } from 'lucide-react';
import { EXPERIENCE_COLUMNS } from '../../data/portfolioData';

const COLUMN_ICONS = [GraduationCap, Building2, Anchor];

export const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="mx-auto max-w-[1440px] border-t border-black/10 px-5 py-24 sm:px-10 sm:py-28 md:px-14"
    >
      <div className="flex flex-col justify-between gap-6 pb-12 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-xs font-medium tracking-wide text-[#707580]">
            Background &amp; Credentials
          </p>
          <h2
            className="text-3xl font-medium tracking-[-0.03em] text-[#0C1016] sm:text-5xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Academic &amp; Industrial Track
          </h2>
        </div>

        <p className="max-w-md text-sm leading-relaxed text-[#5c616b]">
          Combining top European computer engineering training with industrial
          fusion simulation, XR telemetry research, and operational leadership.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {EXPERIENCE_COLUMNS.map((col, idx) => {
          const Icon = COLUMN_ICONS[idx] ?? GraduationCap;
          return (
            <div
              key={col.label}
              className="flex flex-col justify-between rounded-[24px] border border-black/[0.06] bg-white p-7 shadow-xs transition-shadow hover:shadow-md sm:p-8"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#707580]">
                    {col.label}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F3F5F6] text-[#0C1016]">
                    <Icon size={17} strokeWidth={1.8} />
                  </div>
                </div>

                <h3
                  className="text-xl font-medium tracking-tight text-[#0C1016]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {col.title}
                </h3>

                <div className="space-y-5 pt-1">
                  {col.items.map((item) => (
                    <div
                      key={item.role}
                      className="space-y-1 border-l-2 border-[#e3e5e9] pl-3.5"
                    >
                      <div className="text-sm font-semibold text-[#0C1016]">
                        {item.role}
                      </div>
                      <div className="text-xs font-medium text-[#707580]">
                        {item.org}
                      </div>
                      <p className="pt-1 text-xs leading-relaxed text-[#5c616b]">
                        {item.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
