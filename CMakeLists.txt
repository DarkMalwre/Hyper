cmake_minimum_required(VERSION 3.21)
project(hyper)

set(CMAKE_CXX_STANDARD 23)

add_executable(hyper library.cpp test.cpp)
