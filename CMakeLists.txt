cmake_minimum_required(VERSION 3.9)
project(hyper VERSION 1.0.0 DESCRIPTION "Build power-full cross-platform full-stack applications with C++")

set(CMAKE_CXX_STANDARD 23)

file(GLOB_RECURSE __hyper__
    "*.h"
    "*.cxx"
)

add_executable(hyper ${__hyper__})

# add_subdirectory(./vendors/nlohmann/json)

target_include_directories(hyper PUBLIC src)
target_include_directories(hyper PUBLIC scratch)
