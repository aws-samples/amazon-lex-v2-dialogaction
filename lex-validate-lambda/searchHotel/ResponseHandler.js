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
module.exports.delegateResponse = function (
  activeContexts,
  intent,
  sessionAttributes
) {
  return {
    sessionState: {
      activeContexts: activeContexts,
      intent: intent,
      sessionAttributes: sessionAttributes,
      dialogAction: {
        type: "Delegate",
      },
    },
  };
};

module.exports.elicitSlotResponse = function (
  intentName,
  slots,
  slotToElicit,
  message,
  sessionAttributes
) {
  return {
    sessionState: {
      sessionAttributes,
      dialogAction: {
        type: "ElicitSlot",
        slotToElicit,
      },
      intent: {
        name: intentName,
        slots,
      },
    },
    messages: [
      {
        contentType: "PlainText",
        content: message,
      },
    ],
  };
};

module.exports.closeResponse = function (
  sessionAttributes,
  fulfillmentState,
  intent,
  messageText
) {
  console.log("sessionAttributes=", sessionAttributes);

  return {
    sessionState: {
      sessionAttributes,
      dialogAction: {
        type: "Close",
      },
      intent: {
        confirmationState: "Confirmed",
        name: intent,
        state: fulfillmentState,
      },
    },
    messages: [
      {
        contentType: "PlainText",
        content: messageText,
      },
    ],
  };
};

module.exports.elicitIntentResponse = function (
  sessionAttributes,
  messageText
) {
  return {
    sessionState: {
      sessionAttributes,
      dialogAction: {
        type: "ElicitIntent",
      },
    },
    messages: [
      {
        contentType: "PlainText",
        content: messageText,
      },
    ],
  };
};

module.exports.confirmIntentResponse = function (
  sessionAttributes,
  intentName,
  slots,
  messageText
) {
  return {
    sessionState: {
      sessionAttributes,
      dialogAction: {
        type: "ConfirmIntent",
      },
      intent: {
        name: intentName,
        slots,
      },
    },
    messages: [
      {
        contentType: "PlainText",
        content: messageText,
      },
    ],
  };
};
