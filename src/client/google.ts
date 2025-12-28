import { credentials, Metadata } from "@grpc/grpc-js";
import * as json from "./../../credentials.json";
import {
    LiveChatMessageListRequest,
    LiveChatMessageListResponse,
} from "../generatedPb/proto/stream_list_pb";
import { V3DataLiveChatMessageServiceClient } from "../generatedPb/proto/stream_list_grpc_pb";

async function callStreamList(metadata: Metadata) {
    if (!process.argv[2]) {
        throw new Error("Pass LiveChatId");
    }

    const liveChatId = process.argv[2];

    const client = new V3DataLiveChatMessageServiceClient(
        "youtube.googleapis.com:443",
        credentials.createSsl()
    );

    console.log("Start Stream");

    let pageToken: string | undefined;
    let isContinue = true;
    let callNum = 0;
    let time = new Date().getTime();

    while (isContinue) {
        const request = new LiveChatMessageListRequest();
        request.setLiveChatId(liveChatId);
        request.setPartList(["snippet", "authorDetails"]);
        if (pageToken) {
            request.setPageToken(pageToken);
        }

        const nextTime = new Date().getTime();

        console.log(
            `***** Calling (${++callNum}) ${
                (nextTime - time) / 1000
            } sec. ******`
        );
        time = nextTime;
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

export async function googleWithApiKey() {
    const metadata = new Metadata();
    metadata.set("x-goog-api-key", json.apiKey);

    console.log("with API Key");
    await callStreamList(metadata);
}

export async function googleWithAccessToken() {
    const metadata = new Metadata();
    metadata.set("authorization", `Bearer ${json.accessToken}`);

    console.log("with Access Token");
    await callStreamList(metadata);
}
