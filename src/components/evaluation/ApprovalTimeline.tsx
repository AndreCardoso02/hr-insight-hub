import { CheckCircle2, Clock, XCircle, SkipForward } from "lucide-react";
import { ApprovalStep } from "@/data/evaluationMockData";

interface ApprovalTimelineProps {
  steps: ApprovalStep[];
}

const statusConfig = {
  approved: { icon: CheckCircle2, color: "text-success", bg: "bg-success", line: "bg-success" },
  pending: { icon: Clock, color: "text-muted-foreground", bg: "bg-muted", line: "bg-border" },
  rejected: { icon: XCircle, color: "text-destructive", bg: "bg-destructive", line: "bg-destructive" },
  skipped: { icon: SkipForward, color: "text-muted-foreground", bg: "bg-muted", line: "bg-border" },
};

export function ApprovalTimeline({ steps }: ApprovalTimelineProps) {
  return (
    <div className="space-y-0">
      {steps.map((step, index) => {
        const config = statusConfig[step.status];
        const Icon = config.icon;
        const isLast = index === steps.length - 1;

        return (
          <div key={index} className="flex gap-3">
            {/* Timeline line + icon */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${config.bg}/15 border-2 ${step.status === 'approved' ? 'border-success' : step.status === 'rejected' ? 'border-destructive' : 'border-border'}`}>
                <Icon className={`h-4 w-4 ${config.color}`} />
              </div>
              {!isLast && (
                <div className={`w-0.5 flex-1 min-h-[24px] ${config.line}`} />
              )}
            </div>

            {/* Content */}
            <div className="pb-5 pt-0.5 flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{step.role}</p>
                  <p className="text-xs text-muted-foreground">{step.name}</p>
                </div>
                {step.date && (
                  <span className="text-xs text-muted-foreground">
                    {new Date(step.date).toLocaleDateString("pt-BR")}
                  </span>
                )}
              </div>
              {step.comment && (
                <p className="text-xs text-muted-foreground mt-1.5 bg-muted/50 rounded-md p-2 italic">
                  "{step.comment}"
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
