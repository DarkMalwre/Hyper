cmake_minimum_required(VERSION 3.9)
project(hyper VERSION 1.0.0 DESCRIPTION "Build power-full cross-platform full-stack applications with C++")

set(CMAKE_CXX_STANDARD 23)

add_executable(hyper library.cpp test.cpp)
