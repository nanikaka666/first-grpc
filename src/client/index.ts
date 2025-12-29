import { googleWithAccessToken, googleWithApiKey } from "./google";
import { helloServiceClient } from "./helloServiceClient";

(async () => {
    // await helloServiceClient();
    await googleWithApiKey();
    // await googleWithAccessToken();
})();
