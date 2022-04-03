cmake_minimum_required(VERSION 3.19)
project(hyper
	VERSION 1.0.0
	DESCRIPTION "Build powerful cross-platform full-stack applications with C++"
	HOMEPAGE_URL https://github.com/SkylixGH/Hyper
)

set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
set(CMAKE_EXPORT_COMPILE_COMMANDS 1)

option(BUILD_TESTS "Build tests" OFF)

if (NOT CMAKE_BUILD_TYPE AND NOT CMAKE_CONFIGURATION_TYPES)
	message(STATUS "Setting build type to 'Debug' because no build type was specified")
	set(CMAKE_BUILD_TYPE "Debug" CACHE STRING "Choose the build type (Debug/Release)" FORCE)
endif()

set(HYPER_SOURCES
	src/json/JSON.cxx
	src/stringUtil/StringUtil.cxx
	src/terminal/Terminal.cxx
)

add_library(hyper ${HYPER_SOURCES})
target_include_directories(hyper PUBLIC ${CMAKE_CURRENT_SOURCE_DIR}/include)

if(BUILD_TESTS)
	enable_testing()

	include(FetchContent)
	FetchContent_Declare(
		googletest
		URL https://github.com/google/googletest/archive/609281088cfefc76f9d0ce82e1ff6c30cc3591e5.zip
	)
	# For Windows: Prevent overriding the parent project's compiler/linker settings
	set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
	FetchContent_MakeAvailable(googletest)

	file(GLOB_RECURSE TEST_SOURCES tests/*.cxx)
	add_executable(hyper-test ${TEST_SOURCES})
	target_link_libraries(hyper-test hyper gtest_main)

	include(GoogleTest)
	gtest_discover_tests(hyper-test)
endif()

install(TARGETS hyper
	ARCHIVE DESTINATION lib
	LIBRARY DESTINATION lib
	RUNTIME DESTINATION bin
)