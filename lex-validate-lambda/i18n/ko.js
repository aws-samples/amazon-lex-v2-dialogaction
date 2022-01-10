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
    closeResponse:
      " {{customerName}} 님께서 예약하신 호텔은 {{hotelName}}입니다.",
    elicitIntentResponse:
      " {{city}} 에 예약된 호텔이 없습니다. 다시 예약을 원하시면 '호텔예약 다시해죠' 라고 말씀해주세요.",
    elicitSlotofCityResponse: " 도시명을 다시 말씀해주세요.",
    elicitSlotofPhoneNumberResponse:
      " {{customerName}}님 이름으로 등록된 예약이 2개이상입니다. 전화번호를 말씀해주세요.",
    confirmIntentResponse: " {{city}} 에 예약하신게 맞습니까?",
    elicitSlotofPhoneNumber2Response:
      " {{customerName}} 님의 {{customerPhoneNumber}} 전화번호로 예약된 내용이 없습니다. 전화번호를 다시 말씀해주세요.",
    elicitSlotofNameResponse:
      " {{customerName}} 이름으로 예약이 없습니다. 이름을 다시 말씀해주세요.",
  },
};
