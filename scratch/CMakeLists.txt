cmake_minimum_required(VERSION 3.19)
project(hyper-scratch)

add_subdirectory(../ hyper-build)

add_executable(hyper-scratch test.cxx)
target_link_libraries(hyper-scratch hyper)