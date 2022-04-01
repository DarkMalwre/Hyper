#include <iostream>
#include <vector>

using namespace std;

namespace Hyper {
    /**
     * This class is used for manipulating stringUtil.
     */
    class StringUtil {
    public:
        /**
         * This method will take a string and separate it by a specific delimiter.
         * @param rawString The string to be separated.
         * @param delimiter The delimiter to separate the string by.
         * @return All of the sectors of the string as a string array.
         */
        static vector<string> Split(const string& rawString, const string& delimiter);
    };
}