"use client"

import { cn } from "@/lib/utils";

type CurvesEffectProps = {
  className?: string
  firstCurveClassName?: string
  secondCurveClassName?: string
  lastCurveClassName?: string
}

export function CurvesEffect({ className, firstCurveClassName, secondCurveClassName, lastCurveClassName }: CurvesEffectProps) {
  return (
    <div className={ cn('curves', className) }>
      <svg width="100%" viewBox="0 0 745.88685 88.700434" version="1.1">
        <g id="layer1" transform="translate(0.35777846,-262.17068)">
          <path className={cn('stroke-primary', firstCurveClassName)} style={{
            fill: 'none',
            fillRule: 'evenodd',
            strokeWidth: '1.5px',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeOpacity: 1
          }} d="M -0.22423031,268.46083 C 166.75045,222.31585 447.20677,473.98235 745.24443,268.46083" id="path3384"
          />
        </g>
      </svg>
      <svg width="100%" viewBox="0 0 685.88685 123.700434" version="1.1">
        <g id="layer1" transform="translate(0.25777846,-242.17068)">
          <path className={cn('stroke-accent', secondCurveClassName)} style={{
            fill: 'none',
            fillRule: 'evenodd',
            strokeWidth: '2.7px',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeOpacity: 1
          }} d="M -0.22423031,268.46083 C 166.75045,222.31585 447.20677,473.98235 745.24443,268.46083" id="path3384"/>
        </g>
      </svg>
      <svg width="100%" viewBox="0 0 754.94473 93.855249" version="1.1">
        <g transform="translate(1.7580844,-434.006)">
          <path className={cn('stroke-foreground', lastCurveClassName)} style={{
            fill: 'none',
            fillRule: 'evenodd',
            strokeWidth: '0.3px',
            strokeLinecap: 'round',
            strokeLinejoin: 'miter',
            strokeOpacity: 1
          }}
                d="M 752.86109,480.7659 C 638.87925,578.55455 579.84882,491.94626 399.49271,492.88773 263.8489,504.35649 85.845895,554.95289 -1.35284,434.29888"
          />
        </g>
      </svg>
    </div>
  )
}
