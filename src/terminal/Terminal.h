#include <iostream>

using namespace std;

namespace Hyper {
    /**
     * This class is used for interacting with the C++ terminal interface.
     */
    class Terminal {
    public:
        /**
         * Print raw data into the command line interface with C++.
         * @param dataText The data to write into the stream.
         * @param error This option decides if you want to send the output data into the STDERR channel.
         */
        static void Print(const string& dataText, bool error = false);
    };
}
