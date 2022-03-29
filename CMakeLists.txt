cmake_minimum_required(VERSION 3.9)
project(hyper VERSION 1.0.0 DESCRIPTION "Build power-full cross-platform full-stack applications with C++")

set(CMAKE_CXX_STANDARD 23)

file(GLOB_RECURSE ___hyper___
    "*.h"
    "*.cxx"
)

add_executable(hyper ${___hyper___})

target_include_directories(hyper PUBLIC includes)
target_include_directories(hyper PUBLIC src)
