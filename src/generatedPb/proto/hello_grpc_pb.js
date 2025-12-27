// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var proto_hello_pb = require('../proto/hello_pb.js');

function serialize_SayHelloRequest(arg) {
  if (!(arg instanceof proto_hello_pb.SayHelloRequest)) {
    throw new Error('Expected argument of type SayHelloRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_SayHelloRequest(buffer_arg) {
  return proto_hello_pb.SayHelloRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_SayHelloResponse(arg) {
  if (!(arg instanceof proto_hello_pb.SayHelloResponse)) {
    throw new Error('Expected argument of type SayHelloResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_SayHelloResponse(buffer_arg) {
  return proto_hello_pb.SayHelloResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var HelloServiceService = exports.HelloServiceService = {
  sayHello: {
    path: '/HelloService/SayHello',
    requestStream: false,
    responseStream: false,
    requestType: proto_hello_pb.SayHelloRequest,
    responseType: proto_hello_pb.SayHelloResponse,
    requestSerialize: serialize_SayHelloRequest,
    requestDeserialize: deserialize_SayHelloRequest,
    responseSerialize: serialize_SayHelloResponse,
    responseDeserialize: deserialize_SayHelloResponse,
  },
};

exports.HelloServiceClient = grpc.makeGenericClientConstructor(HelloServiceService, 'HelloService');
