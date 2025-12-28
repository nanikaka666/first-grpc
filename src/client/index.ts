import { credentials, Metadata } from "@grpc/grpc-js";
import { HelloServiceClient } from "../generatedPb/proto/hello_grpc_pb";
import {
    SayHelloRequest,
    SayHelloResponse,
} from "../generatedPb/proto/hello_pb";

import * as json from "./../../credentials.json";
import {
    LiveChatMessageListRequest,
    LiveChatMessageListResponse,
} from "../generatedPb/proto/stream_list_pb";
import { V3DataLiveChatMessageServiceClient } from "../generatedPb/proto/stream_list_grpc_pb";

async function main() {
    const client = new HelloServiceClient(
        "localhost:9000",
        credentials.createInsecure()
    );

    const request = new SayHelloRequest();
    request.setNum(999);
    request.setReqarg("Protoc gen!!");

    const response = await new Promise<SayHelloResponse>((resolve, reject) => {
        client.sayHello(request, (error, value) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            if (!value) {
                console.log("undefined");
                reject();
            } else {
                resolve(value);
            }
        });
    });

    console.log(`Client call response: ${response.getResstring()}`);

    console.log("Start Stream");

    await client.sayManyHello(request).forEach((data) => {
        const res: SayHelloResponse = data;
        console.log(`Streaming: ${res.getResstring()}`);
    });

    console.log("End Stream");
}

async function google() {
    const client = new V3DataLiveChatMessageServiceClient(
        "youtube.googleapis.com:443",
        credentials.createSsl()
    );

    const metadata = new Metadata();
    metadata.set("x-goog-api-key", json.apiKey);

    console.log("Start Stream");

    let pageToken: string | undefined;
    let isContinue = true;

    while (isContinue) {
        const request = new LiveChatMessageListRequest();
        request.setLiveChatId(
            "Cg0KC3FaLWwyNlFOaENZKicKGFVDelVOQVNkekk0UFY1U2xxdFl3QWtLURILcVotbDI2UU5oQ1k"
        );
        request.setPartList(["snippet", "authorDetails"]);
        if (pageToken) {
            request.setPageToken(pageToken);
        }

        console.log("***** Calling ******");
        await client.streamList(request, metadata).forEach((data) => {
            const res: LiveChatMessageListResponse.AsObject = (
                data as LiveChatMessageListResponse
            ).toObject();

            res.itemsList.forEach((message) => {
                console.log(
                    `${message.authorDetails?.displayName}: ${message.snippet?.displayMessage}`
                );
            });

            if (res.nextPageToken) {
                pageToken = res.nextPageToken;
            }
            if (res.offlineAt) {
                isContinue = false;
            }
        });
    }

    console.log("End Stream");
}

(async () => {
    // await main();
    await google();
})();
