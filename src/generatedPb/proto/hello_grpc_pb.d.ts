// GENERATED CODE -- DO NOT EDIT!

// package: 
// file: proto/hello.proto

import * as proto_hello_pb from "../proto/hello_pb";
import * as grpc from "@grpc/grpc-js";

interface IHelloServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  sayHello: grpc.MethodDefinition<proto_hello_pb.SayHelloRequest, proto_hello_pb.SayHelloResponse>;
  sayManyHello: grpc.MethodDefinition<proto_hello_pb.SayHelloRequest, proto_hello_pb.SayHelloResponse>;
}

export const HelloServiceService: IHelloServiceService;

export interface IHelloServiceServer extends grpc.UntypedServiceImplementation {
  sayHello: grpc.handleUnaryCall<proto_hello_pb.SayHelloRequest, proto_hello_pb.SayHelloResponse>;
  sayManyHello: grpc.handleServerStreamingCall<proto_hello_pb.SayHelloRequest, proto_hello_pb.SayHelloResponse>;
}

export class HelloServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  sayHello(argument: proto_hello_pb.SayHelloRequest, callback: grpc.requestCallback<proto_hello_pb.SayHelloResponse>): grpc.ClientUnaryCall;
  sayHello(argument: proto_hello_pb.SayHelloRequest, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<proto_hello_pb.SayHelloResponse>): grpc.ClientUnaryCall;
  sayHello(argument: proto_hello_pb.SayHelloRequest, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<proto_hello_pb.SayHelloResponse>): grpc.ClientUnaryCall;
  sayManyHello(argument: proto_hello_pb.SayHelloRequest, metadataOrOptions?: grpc.Metadata | grpc.CallOptions | null): grpc.ClientReadableStream<proto_hello_pb.SayHelloResponse>;
  sayManyHello(argument: proto_hello_pb.SayHelloRequest, metadata?: grpc.Metadata | null, options?: grpc.CallOptions | null): grpc.ClientReadableStream<proto_hello_pb.SayHelloResponse>;
}
