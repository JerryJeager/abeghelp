import type { ApiResponse } from "@/interfaces";
import type { Campaign } from "@/interfaces/Campaign";
import { callApi } from "@/lib";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";
import type { SelectorFn } from "./store-types";

type CampaignStore = {
	loading: boolean;
	campaigns: Campaign[];
	allUserCampaigns: Campaign[];
	categories: Array<{ _id: string; name: string }>;

	actions: {
		addCampaign: (newCampaign: Campaign) => void;
		initializeCampaigns: (campaigns: Campaign[]) => void;
		initializeAllUserCampaigns: (userId: string | undefined) => Promise<void>;
		initializeCategories: () => Promise<void>;
	};
};

const initialState = {
	loading: true,
	campaigns: [],
	allUserCampaigns: [],
	categories: [],
} satisfies Omit<CampaignStore, "actions">;

export const useInitCampaignStore = create<CampaignStore>()((set, get) => ({
	...initialState,

	actions: {
		addCampaign: (newCampaign) => {
			const { campaigns: oldCampaigns } = get();

			set({
				campaigns: Array.isArray(oldCampaigns) ? [...oldCampaigns, newCampaign] : [newCampaign],
			});
		},

		initializeCampaigns: (campaigns) => set({ campaigns }),

		initializeAllUserCampaigns: async (userId) => {
			if (!userId) return;

			const { data, error } = await callApi<ApiResponse<Campaign[]>>(`/campaign/user/${userId}`);

			if (error || !data?.data) return;

			set({ allUserCampaigns: data.data });
		},

		initializeCategories: async () => {
			const { data, error } =
				await callApi<ApiResponse<CampaignStore["categories"]>>("/campaign/categories");

			if (error || !data?.data) return;

			set({ categories: data.data });
		},
	} satisfies CampaignStore["actions"],
}));

export const useCampaignStore = <TResult>(selector: SelectorFn<CampaignStore, TResult>) => {
	const state = useInitCampaignStore(useShallow(selector));

	return state;
};
