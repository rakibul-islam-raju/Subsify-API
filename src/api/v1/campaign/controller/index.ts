import { create } from "./create";
import { findAllItems } from "./findAllItems";
import { findSingItem } from "./findSingItem";
import { updateItemPatch } from "./updateItemPatch";
import { removeItem } from "./removeItem";
import { subscribe } from "./subscribe";
import { unsubscribe } from "./unsubscribe";

export const campaignController = {
	create,
	findAllItems,
	findSingItem,
	updateItemPatch,
	removeItem,
	subscribe,
	unsubscribe,
};
