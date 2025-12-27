import {
    loadPackageDefinition,
    Server,
    ServerCredentials,
} from "@grpc/grpc-js";
import * as ProtoLoader from "@grpc/proto-loader";

import type { ProtoGrpcType } from "../protoDist/hello";
import { HelloServiceHandlers } from "../protoDist/HelloService";
import { SayHelloResponse } from "../protoDist/SayHelloResponse";

const handler: HelloServiceHandlers = {
    SayHello(call, callback) {
        const res: SayHelloResponse = {
            resString: `Hello ${call.request.reqArg} ${call.request.num}`,
        };
        callback(null, res);
    },
};

function main() {
    const server = new Server();

    const packageDefinition = ProtoLoader.loadSync("./proto/hello.proto");
    const loadedPackageDefinition = loadPackageDefinition(
        packageDefinition
    ) as unknown as ProtoGrpcType;

    server.addService(loadedPackageDefinition.HelloService.service, handler);

    server.bindAsync(
        "0.0.0.0:9000",
        ServerCredentials.createInsecure(),
        (error, port) => {
            if (error) {
                console.log(error);
                return;
            }

            console.log(`GRPC Server start at ${port}`);
        }
    );
}

main();
