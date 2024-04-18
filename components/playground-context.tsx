import React, { createContext, useContext, useState } from 'react';
import { UserSubscriptionPlan } from "@/types";
import { ProPlanModal } from "@/components/pro-plan-modal";
import { Chart } from "@prisma/client";

const PlaygroundContext = createContext<{
  chart?: Pick<Chart, "id" | "aspectRatio" | "config" | "watermark" | "createdAt">
  rerenderChart: boolean;
  isPro: boolean;
  toggleRerenderChart: () => void;
  toggleProPlanModal: () => void;
}>({
  chart: undefined,
  rerenderChart: false,
  isPro: false,
  toggleRerenderChart: () => {},
  toggleProPlanModal: () => {}
});

type PlaygroundProviderProps = {
  chart: Pick<Chart, "id" | "aspectRatio" | "config" | "watermark" | "createdAt">
  children?: React.ReactNode
  subscriptionPlan: UserSubscriptionPlan;
};

export const PlaygroundProvider = ({ chart, children, subscriptionPlan }: PlaygroundProviderProps) => {
  const [rerenderChart, setRerenderChart] = useState(false);
  const [showProPlanModal, setShowProPlanModal] = useState(false);
  const isPro = subscriptionPlan?.isPro;

  const toggleProPlanModal = () => {
    setShowProPlanModal(prevState => !prevState);
  };

  const toggleRerenderChart = () => {
    setRerenderChart(prevState => !prevState);
  };

  return (
    <PlaygroundContext.Provider value={{ chart, rerenderChart, isPro, toggleRerenderChart, toggleProPlanModal }}>
      {children}
      <ProPlanModal open={showProPlanModal} onOpenChange={setShowProPlanModal} />
    </PlaygroundContext.Provider>
  );
};

export const usePlayground = () => useContext(PlaygroundContext);
