/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: MIT-0
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

module.exports = {
  translation: {
    closeResponse: " The hotel booked by {{customerName}} is {{hotelName}}.",
    elicitIntentResponse:
      " There are no hotels booked in {{city}}. If you want to make a reservation again, please say 'I'll make a hotel reservation again'.",
    elicitSlotofCityResponse: " Please tell me the name of the city again.",
    elicitSlotofPhoneNumberResponse:
      " There are more than 2 reservations registered under the name of {{customerName}}. Please tell me your phone number.",
    confirmIntentResponse: " Are you sure you made a reservation in {{city}}?",
    elicitSlotofPhoneNumber2Response:
      " There are no reservations for {{customerName}}'s {{customerPhoneNumber}} phone number. Please tell me your phone number again.",
    elicitSlotofNameResponse:
      " There are no reservations with the name {{customerName}}. Please tell me your name again",
  },
};
