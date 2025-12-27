import { credentials, loadPackageDefinition } from "@grpc/grpc-js";
import * as ProtoLoader from "@grpc/proto-loader";

import type { ProtoGrpcType } from "../protoDist/hello";
import { makeGenericClientConstructor } from "@grpc/grpc-js";
import { HelloServiceClient } from "../protoDist/HelloService";
import { SayHelloRequest } from "../protoDist/SayHelloRequest";
import { SayHelloResponse } from "../protoDist/SayHelloResponse";

async function main() {
    const packageDefinition = ProtoLoader.loadSync("./proto/hello.proto");
    const loadedPackageDefinition = loadPackageDefinition(
        packageDefinition
    ) as unknown as ProtoGrpcType;

    const Client = makeGenericClientConstructor(
        loadedPackageDefinition.HelloService.service,
        ".HelloService/SayHello"
    );

    const client = new Client(
        "localhost:9000",
        credentials.createInsecure()
    ) as unknown as HelloServiceClient;

    const request: SayHelloRequest = {
        num: 33,
        reqArg: "Client!!",
    };

    const response = await new Promise<SayHelloResponse>((resolve, reject) => {
        client.SayHello(request, (error, value) => {
            if (error) {
                console.log(error);
                reject(error);
            }
            if (!value) {
                console.log("undefined");
                reject();
            }
            resolve(value as SayHelloResponse);
        });
    });

    console.log(`Client call response: ${response.resString}`);
}

(async () => {
    await main();
})();
