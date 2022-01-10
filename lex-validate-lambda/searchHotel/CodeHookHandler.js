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

const appsync = require("aws-appsync");
const gql = require("graphql-tag");
require("isomorphic-fetch");
const i18n = require("i18next");

const languageStrings = {
  en: require("./../i18n/en"),
  ko: require("./../i18n/ko"),
};
const {
  closeResponse,
  elicitSlotResponse,
  elicitIntentResponse,
  delegateResponse,
  confirmIntentResponse,
} = require("./ResponseHandler");

const graphqlClient = new appsync.AWSAppSyncClient({
  url: process.env.aws_appsync_graphqlEndpoint,
  region: process.env.region,
  auth: {
    type: "API_KEY",
    apiKey: process.env.aws_appsync_apiKey,
  },
  disableOffline: true,
});
const ByCustomerName = gql`
  query ByCustomerName(
    $customerName: String
    $sortDirection: ModelSortDirection
    $filter: ModelHotelResevationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ByCustomerName(
      customerName: $customerName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        customerName
        customerPhoneNumber
        city
        hotelName
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

async function searchHotel(request, customerName, customerPhoneNumber, city) {
  const response = await graphqlClient.query({
    query: ByCustomerName,
    variables: {
      customerName: customerName.value.interpretedValue.replace(/(\s*)/g, ""),
    },
  });
  console.log(
    "response.data.ByCustomerName.items=",
    response.data.ByCustomerName.items
  );

  let hotelName;
  let customerNameItems = response.data.ByCustomerName.items;
  let sessionAttributes = request.sessionAttributes || {};

  if (customerNameItems && customerNameItems.length > 1) {
    console.log("size is over than 1");

    for (let i = 0; i < customerNameItems.length; ++i) {
      console.log("id == ", customerNameItems[i]);

      if (
        customerNameItems[i].customerPhoneNumber ===
        customerPhoneNumber.value.interpretedValue.replace(/(\s*)/g, "")
      ) {
        if (
          customerNameItems[i].city &&
          customerNameItems[i].city ===
            city.value.interpretedValue.replace(/(\s*)/g, "")
        ) {
          hotelName = customerNameItems[i].hotelName;
          console.log("hotelName == ", hotelName);
          return closeResponse(
            sessionAttributes,
            "Fulfilled",
            request.interpretations[0].intent.name,
            i18n.t("closeResponse", {
              customerName: customerName.value.interpretedValue,
              hotelName: hotelName,
            })
            // `${customerName.value.interpretedValue} 님께서 예약하신 호텔은 ${hotelName}입니다`
          );
        } else {
          console.log("hotelName  else");

          return elicitIntentResponse(
            sessionAttributes,
            i18n.t("elicitIntentResponse", {
              city: city.value.interpretedValue,
            })
            //  `${city.value.interpretedValue} 에 예약된 호텔이 없습니다. 다시 예약을 원하시면 "호텔예약 다시해죠" 라고 말씀해주세요 `
          );
        }

        break;
      }
    }
  } else {
    if (
      customerNameItems[0].city &&
      customerNameItems[0].city ===
        city.value.interpretedValue.replace(/(\s*)/g, "")
    ) {
      hotelName = customerNameItems[0].hotelName;
      console.log("hotelName == ", hotelName);
    } else {
      console.log("hotelName  else");

      return elicitIntentResponse(
        sessionAttributes,
        i18n.t("elicitIntentResponse", {
          city: city.value.interpretedValue,
        })
        // `${customerName.value.interpretedValue.replace(
        //   /(\s*)/g,
        //   ""
        // )} 에 예약된 호텔이 없습니다. 다시 예약을 원하시면 "호텔예약 다시해죠" 라고 말씀해주세요 `
      );
    }
  }
  console.log("-  hotelName = ", hotelName);
  return closeResponse(
    sessionAttributes,
    "Fulfilled",
    request.interpretations[0].intent.name,
    i18n.t("closeResponse", {
      customerName: customerName.value.interpretedValue,
      hotelName: hotelName,
    })
    //   `${customerName.value.interpretedValue} 님께서 예약하신 호텔은 ${hotelName}입니다`
  );
}

async function validateSearchHotel(
  request,
  customerName,
  customerPhoneNumber,
  city
) {
  console.log("validateSearchHotel : customerName - ", customerName);
  console.log("validateSearchHotel : city -", city);
  console.log(
    "validateSearchHotel : customerPhoneNumber -",
    customerPhoneNumber
  );
  //console.log("response=", response);
  let outputSessionAttributes = request.sessionAttributes || {};
  let sessionAttributes = request.sessionAttributes || {};
  try {
    if (request.sessionState.intent.confirmationState === "Confirmed") {
      console.log("네");

      return delegateResponse(
        request.sessionState.activeContexts,
        request.sessionState.intent,
        sessionAttributes
      );
    } else if (request.sessionState.intent.confirmationState === "Denied") {
      console.log("아니오");

      return elicitSlotResponse(
        request.interpretations[0].intent.name,
        request.interpretations[0].intent.slots,
        "City",
        i18n.t("elicitSlotofCityResponse"),
        // "도시명을 다시 말씀해주세요.",
        outputSessionAttributes
      );
    }
    if (customerName !== null) {
      const response = await graphqlClient.query({
        query: ByCustomerName,
        variables: {
          customerName: customerName.value.interpretedValue.replace(
            /(\s*)/g,
            ""
          ),
        },
      });

      console.log(
        "response.data.ByCustomerName.items=",
        response.data.ByCustomerName.items
      );

      let customerNameItems = response.data.ByCustomerName.items;

      if (customerNameItems && customerNameItems.length > 1) {
        console.log("size is over than 1");

        for (let i = 0; i < customerNameItems.length; ++i) {
          if (customerPhoneNumber === null) {
            return elicitSlotResponse(
              request.interpretations[0].intent.name,
              request.interpretations[0].intent.slots,
              "CustomerPhoneNumber",
              i18n.t("elicitSlotofPhoneNumberResponse", {
                customerName: customerName.value.interpretedValue,
              }),
              outputSessionAttributes
            );
          } else if (
            customerNameItems[i].customerPhoneNumber ===
            customerPhoneNumber.value.interpretedValue.replace(/(\s*)/g, "")
          ) {
            if (city !== null) {
              return confirmIntentResponse(
                sessionAttributes,
                request.interpretations[0].intent.name,
                request.interpretations[0].intent.slots,
                i18n.t("confirmIntentResponse", {
                  city: city.value.interpretedValue,
                })
              );
            } else {
              return delegateResponse(
                request.sessionState.activeContexts,
                request.sessionState.intent,
                sessionAttributes
              );
            }
          }
        }
        return elicitSlotResponse(
          request.interpretations[0].intent.name,
          request.interpretations[0].intent.slots,
          "CustomerPhoneNumber",
          i18n.t("elicitSlotofPhoneNumber2Response", {
            customerName: customerName.value.interpretedValue,
            customerPhoneNumber: customerPhoneNumber.value.interpretedValue,
          }),
          // `${customerName.value.interpretedValue.replace(
          //   /(\s*)/g,
          //   ""
          // )}님의 ${customerPhoneNumber.value.interpretedValue.replace(
          //   /(\s*)/g,
          //   ""
          // )} 전화번호로 예약된 내용이 없습니다. 전화번호를 다시 말씀해주세요.`,
          outputSessionAttributes
        );
      } else {
        if (
          response.data.ByCustomerName.items[0] &&
          response.data.ByCustomerName.items[0].customerName ===
            customerName.value.interpretedValue.replace(/(\s*)/g, "")
        ) {
          if (city !== null) {
            return confirmIntentResponse(
              sessionAttributes,
              request.interpretations[0].intent.name,
              request.interpretations[0].intent.slots,
              i18n.t("confirmIntentResponse", {
                city: city.value.interpretedValue,
              })
              //`${city.value.interpretedValue} 시에 예약하신게 맞습니까?`
            );
          } else {
            return delegateResponse(
              request.sessionState.activeContexts,
              request.sessionState.intent,
              sessionAttributes
            );
          }
        } else {
          return elicitSlotResponse(
            request.interpretations[0].intent.name,
            request.interpretations[0].intent.slots,
            "CustomerName",
            i18n.t("elicitSlotofNameResponse", {
              customerName: customerName.value.interpretedValue,
            }),
            //  `${customerName.value.interpretedValue} 이름으로 예약이 없습니다. 이름을 다시 말씀해주세요.`,
            outputSessionAttributes
          );
        }
      }
    } else {
      return delegateResponse(
        request.sessionState.activeContexts,
        request.sessionState.intent,
        sessionAttributes
      );
    }
  } catch (err) {
    console.log("err=", err);
  } finally {
    //  console.log("finally");
  }
}

async function handleDialogCodeHook(request) {
  console.log("handleDialogCodeHook request = ", request);
  console.log("test ===== ", i18n.t("SKILL_NAME"));

  var customerName = request.interpretations[0].intent.slots.CustomerName;
  var customerPhoneNumber =
    request.interpretations[0].intent.slots.CustomerPhoneNumber;
  var city = request.interpretations[0].intent.slots.City;
  const slots = request.interpretations[0].intent.slots;
  console.log("handleDialogCodeHook request customerName= ", customerName);

  return validateSearchHotel(request, customerName, customerPhoneNumber, city);
}

function handleFulfillmentCodeHook(request) {
  console.log("handleFulfillmentCodeHook request = ", request);
  console.log("request", request.interpretations[0].intent);

  let customerName = request.interpretations[0].intent.slots.CustomerName;
  let customerPhoneNumber =
    request.interpretations[0].intent.slots.CustomerPhoneNumber;
  let city = request.interpretations[0].intent.slots.City;

  return searchHotel(request, customerName, customerPhoneNumber, city);
}

async function handleRequest(request) {
  console.log("request in handleRequest = ", request);

  let localid = "en";
  if (request.bot.localeId === "ko_KR") {
    localid = "ko";
  }
  console.log("handleDialogCodeHook localid = ", localid);
  await i18n.init({
    lng: localid,
    fallbackLng: "en", // fallback to EN if locale doesn't exist
    resources: languageStrings,
  });

  if (request.invocationSource === "DialogCodeHook") {
    return handleDialogCodeHook(request);
  }

  if (request.invocationSource === "FulfillmentCodeHook") {
    return handleFulfillmentCodeHook(request);
  }
}

module.exports = {
  handleRequest,
};
