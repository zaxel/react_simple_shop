import axios from "axios";
import { createBulkDevices } from "./adminDevices";

export const processBatch = async(batch, cart, user, controller, signal, removeController) => {
    try {
      const responses = await createBulkDevices(batch, cart, user, signal);
      console.log(responses)
      const counts = responses.reduce(
        (acc, { status, value }) => {
          if ((status === "fulfilled" && value.data.status === "rejected")
                || status === "rejected") {
            acc.failures++;
            acc.imageFails += value.data.value.failed || 0;
          } else {
            acc.successes++;
            acc.imageSuccesses += value.data.value.saved || 0;
          }
          return acc;
        },
        { failures: 0, imageFails: 0, successes: 0, imageSuccesses: 0 });
      return counts || { failures: 0, imageFails: 0, successes: 0, imageSuccesses: 0 };
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Batch request aborted:', batch);
      } else {
        console.error('Error in batch:', error);
      }
    } finally {
      removeController(controller);
    }
  }

  export const addBulkItemsInBatches = async (breakRef, itemsBunch, batchSize, delay, addController, removeController, cart, user, setStatus) => {
    setStatus('starting process.');
    const totalCounts = {failures: 0, imageFails: 0, successes: 0, imageSuccesses: 0};
    for (let i = 0; i < itemsBunch.length; i += batchSize) {
      if (breakRef.current)
        break;
      const batch = itemsBunch.slice(i, i + batchSize);
      const controller = new AbortController();
      const signal = controller.signal;
      addController(controller);
      setStatus("sending new batch with size of " + batch.length)
 
      const { failures, imageFails, successes, imageSuccesses } = await processBatch(batch, cart, user, controller, signal, addController, removeController);
      totalCounts.failures += failures;
      totalCounts.successes += successes;
      totalCounts.imageFails += imageFails;
      totalCounts.imageSuccesses += imageSuccesses;
      if (i + batchSize < itemsBunch.length) {
        setStatus(`waiting for ${delay / 1000} seconds before sending the next batch...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    return totalCounts;
  };