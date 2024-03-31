import React, { createContext, useContext, useState } from 'react';
import { UserSubscriptionPlan } from "@/types";
import {ProPlanModal} from "@/components/pro-plan-modal";

const PlaygroundContext = createContext<{
  rerenderChart: boolean;
  isPro: boolean;
  toggleRerenderChart: () => void;
  toggleProPlanModal: () => void;
}>({
  rerenderChart: false,
  isPro: false,
  toggleRerenderChart: () => {},
  toggleProPlanModal: () => {}
});

type PlaygroundProviderProps = {
  children?: React.ReactNode
  subscriptionPlan: UserSubscriptionPlan;
};

export const PlaygroundProvider = ({ children, subscriptionPlan }: PlaygroundProviderProps) => {
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
    <PlaygroundContext.Provider value={{ rerenderChart, isPro, toggleRerenderChart, toggleProPlanModal }}>
      {children}
      <ProPlanModal open={showProPlanModal} onOpenChange={setShowProPlanModal} />
    </PlaygroundContext.Provider>
  );
};

export const usePlayground = () => useContext(PlaygroundContext);
