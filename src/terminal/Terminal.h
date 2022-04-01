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

        /**
         * Log an informative message into the C++ terminal interface.
         * @param message The message to log into the terminal through the STDOUT channel.
         */
        static void Log(const string& message);

        /**
         * Colorize a string with a hex color for printing in the C++ terminal interface.
         * @param text The text to colorize.
         * @param data The color data separated by a semi colon.
         * @return The colorized string.
         */
        static string Colorize(const string& text, const string& data);
    };
}
