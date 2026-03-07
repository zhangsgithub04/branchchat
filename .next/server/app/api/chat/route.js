/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/chat/route";
exports.ids = ["app/api/chat/route"];
exports.modules = {

/***/ "(rsc)/./app/api/chat/route.ts":
/*!*******************************!*\
  !*** ./app/api/chat/route.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   runtime: () => (/* binding */ runtime)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_ai__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/ai */ \"(rsc)/./lib/ai.ts\");\n\n\n\nconst runtime = 'nodejs';\nfunction normalizeProvider(value) {\n    return value === 'openai' ? 'openai' : 'gemini';\n}\nfunction isGeminiKeyDenied(error) {\n    const message = error instanceof Error ? error.message : String(error || '');\n    return message.includes('PERMISSION_DENIED') || message.includes('reported as leaked') || message.includes('API key');\n}\nasync function POST(request) {\n    const auth = await (0,_lib_auth__WEBPACK_IMPORTED_MODULE_1__.getAuthContext)(request);\n    if (!auth) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Unauthorized'\n        }, {\n            status: 401\n        });\n    }\n    try {\n        const body = await request.json();\n        const history = Array.isArray(body?.history) ? body.history : [];\n        const content = typeof body?.content === 'string' ? body.content : '';\n        const provider = normalizeProvider(body?.provider);\n        if (provider === 'openai') {\n            const result = await (0,_lib_ai__WEBPACK_IMPORTED_MODULE_2__.generateWithOpenAI)(history, content);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                ...result,\n                providerUsed: 'openai'\n            });\n        }\n        try {\n            const result = await (0,_lib_ai__WEBPACK_IMPORTED_MODULE_2__.generateWithGemini)(history, content);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                ...result,\n                providerUsed: 'gemini'\n            });\n        } catch (geminiError) {\n            if (!isGeminiKeyDenied(geminiError)) {\n                throw geminiError;\n            }\n            // Fallback so chats still work when Gemini key is revoked/leaked.\n            const fallback = await (0,_lib_ai__WEBPACK_IMPORTED_MODULE_2__.generateWithOpenAI)(history, content);\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                ...fallback,\n                providerUsed: 'openai'\n            });\n        }\n    } catch (error) {\n        console.error('AI proxy error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error?.message || 'Failed to generate response'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NoYXQvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBd0Q7QUFDWjtBQUNzQjtBQUUzRCxNQUFNSSxVQUFVLFNBQVM7QUFJaEMsU0FBU0Msa0JBQWtCQyxLQUFjO0lBQ3ZDLE9BQU9BLFVBQVUsV0FBVyxXQUFXO0FBQ3pDO0FBRUEsU0FBU0Msa0JBQWtCQyxLQUFjO0lBQ3ZDLE1BQU1DLFVBQVVELGlCQUFpQkUsUUFBUUYsTUFBTUMsT0FBTyxHQUFHRSxPQUFPSCxTQUFTO0lBQ3pFLE9BQ0VDLFFBQVFHLFFBQVEsQ0FBQyx3QkFDakJILFFBQVFHLFFBQVEsQ0FBQyx5QkFDakJILFFBQVFHLFFBQVEsQ0FBQztBQUVyQjtBQUVPLGVBQWVDLEtBQUtDLE9BQW9CO0lBQzdDLE1BQU1DLE9BQU8sTUFBTWQseURBQWNBLENBQUNhO0lBQ2xDLElBQUksQ0FBQ0MsTUFBTTtRQUNULE9BQU9mLHFEQUFZQSxDQUFDZ0IsSUFBSSxDQUFDO1lBQUVSLE9BQU87UUFBZSxHQUFHO1lBQUVTLFFBQVE7UUFBSTtJQUNwRTtJQUVBLElBQUk7UUFDRixNQUFNQyxPQUFPLE1BQU1KLFFBQVFFLElBQUk7UUFDL0IsTUFBTUcsVUFBVUMsTUFBTUMsT0FBTyxDQUFDSCxNQUFNQyxXQUFXRCxLQUFLQyxPQUFPLEdBQUcsRUFBRTtRQUNoRSxNQUFNRyxVQUFVLE9BQU9KLE1BQU1JLFlBQVksV0FBV0osS0FBS0ksT0FBTyxHQUFHO1FBQ25FLE1BQU1DLFdBQVdsQixrQkFBa0JhLE1BQU1LO1FBRXpDLElBQUlBLGFBQWEsVUFBVTtZQUN6QixNQUFNQyxTQUFTLE1BQU1yQiwyREFBa0JBLENBQUNnQixTQUFTRztZQUNqRCxPQUFPdEIscURBQVlBLENBQUNnQixJQUFJLENBQUM7Z0JBQUUsR0FBR1EsTUFBTTtnQkFBRUMsY0FBYztZQUFTO1FBQy9EO1FBRUEsSUFBSTtZQUNGLE1BQU1ELFNBQVMsTUFBTXRCLDJEQUFrQkEsQ0FBQ2lCLFNBQVNHO1lBQ2pELE9BQU90QixxREFBWUEsQ0FBQ2dCLElBQUksQ0FBQztnQkFBRSxHQUFHUSxNQUFNO2dCQUFFQyxjQUFjO1lBQVM7UUFDL0QsRUFBRSxPQUFPQyxhQUFhO1lBQ3BCLElBQUksQ0FBQ25CLGtCQUFrQm1CLGNBQWM7Z0JBQ25DLE1BQU1BO1lBQ1I7WUFFQSxrRUFBa0U7WUFDbEUsTUFBTUMsV0FBVyxNQUFNeEIsMkRBQWtCQSxDQUFDZ0IsU0FBU0c7WUFDbkQsT0FBT3RCLHFEQUFZQSxDQUFDZ0IsSUFBSSxDQUFDO2dCQUFFLEdBQUdXLFFBQVE7Z0JBQUVGLGNBQWM7WUFBUztRQUNqRTtJQUNGLEVBQUUsT0FBT2pCLE9BQVk7UUFDbkJvQixRQUFRcEIsS0FBSyxDQUFDLG1CQUFtQkE7UUFDakMsT0FBT1IscURBQVlBLENBQUNnQixJQUFJLENBQ3RCO1lBQUVSLE9BQU9BLE9BQU9DLFdBQVc7UUFBOEIsR0FDekQ7WUFBRVEsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIi9Vc2Vycy96aGFuZ3MvaWl0ZzI1MS9icmFuY2hjaGF0LXZpc3VhbGl6ZXIvYXBwL2FwaS9jaGF0L3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgeyBnZXRBdXRoQ29udGV4dCB9IGZyb20gJ0AvbGliL2F1dGgnO1xuaW1wb3J0IHsgZ2VuZXJhdGVXaXRoR2VtaW5pLCBnZW5lcmF0ZVdpdGhPcGVuQUkgfSBmcm9tICdAL2xpYi9haSc7XG5cbmV4cG9ydCBjb25zdCBydW50aW1lID0gJ25vZGVqcyc7XG5cbnR5cGUgUHJvdmlkZXIgPSAnZ2VtaW5pJyB8ICdvcGVuYWknO1xuXG5mdW5jdGlvbiBub3JtYWxpemVQcm92aWRlcih2YWx1ZTogdW5rbm93bik6IFByb3ZpZGVyIHtcbiAgcmV0dXJuIHZhbHVlID09PSAnb3BlbmFpJyA/ICdvcGVuYWknIDogJ2dlbWluaSc7XG59XG5cbmZ1bmN0aW9uIGlzR2VtaW5pS2V5RGVuaWVkKGVycm9yOiB1bmtub3duKSB7XG4gIGNvbnN0IG1lc3NhZ2UgPSBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvciB8fCAnJyk7XG4gIHJldHVybiAoXG4gICAgbWVzc2FnZS5pbmNsdWRlcygnUEVSTUlTU0lPTl9ERU5JRUQnKSB8fFxuICAgIG1lc3NhZ2UuaW5jbHVkZXMoJ3JlcG9ydGVkIGFzIGxlYWtlZCcpIHx8XG4gICAgbWVzc2FnZS5pbmNsdWRlcygnQVBJIGtleScpXG4gICk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IE5leHRSZXF1ZXN0KSB7XG4gIGNvbnN0IGF1dGggPSBhd2FpdCBnZXRBdXRoQ29udGV4dChyZXF1ZXN0KTtcbiAgaWYgKCFhdXRoKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdVbmF1dGhvcml6ZWQnIH0sIHsgc3RhdHVzOiA0MDEgfSk7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcbiAgICBjb25zdCBoaXN0b3J5ID0gQXJyYXkuaXNBcnJheShib2R5Py5oaXN0b3J5KSA/IGJvZHkuaGlzdG9yeSA6IFtdO1xuICAgIGNvbnN0IGNvbnRlbnQgPSB0eXBlb2YgYm9keT8uY29udGVudCA9PT0gJ3N0cmluZycgPyBib2R5LmNvbnRlbnQgOiAnJztcbiAgICBjb25zdCBwcm92aWRlciA9IG5vcm1hbGl6ZVByb3ZpZGVyKGJvZHk/LnByb3ZpZGVyKTtcblxuICAgIGlmIChwcm92aWRlciA9PT0gJ29wZW5haScpIHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGdlbmVyYXRlV2l0aE9wZW5BSShoaXN0b3J5LCBjb250ZW50KTtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IC4uLnJlc3VsdCwgcHJvdmlkZXJVc2VkOiAnb3BlbmFpJyB9KTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZ2VuZXJhdGVXaXRoR2VtaW5pKGhpc3RvcnksIGNvbnRlbnQpO1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgLi4ucmVzdWx0LCBwcm92aWRlclVzZWQ6ICdnZW1pbmknIH0pO1xuICAgIH0gY2F0Y2ggKGdlbWluaUVycm9yKSB7XG4gICAgICBpZiAoIWlzR2VtaW5pS2V5RGVuaWVkKGdlbWluaUVycm9yKSkge1xuICAgICAgICB0aHJvdyBnZW1pbmlFcnJvcjtcbiAgICAgIH1cblxuICAgICAgLy8gRmFsbGJhY2sgc28gY2hhdHMgc3RpbGwgd29yayB3aGVuIEdlbWluaSBrZXkgaXMgcmV2b2tlZC9sZWFrZWQuXG4gICAgICBjb25zdCBmYWxsYmFjayA9IGF3YWl0IGdlbmVyYXRlV2l0aE9wZW5BSShoaXN0b3J5LCBjb250ZW50KTtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IC4uLmZhbGxiYWNrLCBwcm92aWRlclVzZWQ6ICdvcGVuYWknIH0pO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0FJIHByb3h5IGVycm9yOicsIGVycm9yKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oXG4gICAgICB7IGVycm9yOiBlcnJvcj8ubWVzc2FnZSB8fCAnRmFpbGVkIHRvIGdlbmVyYXRlIHJlc3BvbnNlJyB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImdldEF1dGhDb250ZXh0IiwiZ2VuZXJhdGVXaXRoR2VtaW5pIiwiZ2VuZXJhdGVXaXRoT3BlbkFJIiwicnVudGltZSIsIm5vcm1hbGl6ZVByb3ZpZGVyIiwidmFsdWUiLCJpc0dlbWluaUtleURlbmllZCIsImVycm9yIiwibWVzc2FnZSIsIkVycm9yIiwiU3RyaW5nIiwiaW5jbHVkZXMiLCJQT1NUIiwicmVxdWVzdCIsImF1dGgiLCJqc29uIiwic3RhdHVzIiwiYm9keSIsImhpc3RvcnkiLCJBcnJheSIsImlzQXJyYXkiLCJjb250ZW50IiwicHJvdmlkZXIiLCJyZXN1bHQiLCJwcm92aWRlclVzZWQiLCJnZW1pbmlFcnJvciIsImZhbGxiYWNrIiwiY29uc29sZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/chat/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/ai.ts":
/*!*******************!*\
  !*** ./lib/ai.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generateWithGemini: () => (/* binding */ generateWithGemini),\n/* harmony export */   generateWithOpenAI: () => (/* binding */ generateWithOpenAI)\n/* harmony export */ });\n/* harmony import */ var _google_genai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @google/genai */ \"(rsc)/./node_modules/@google/genai/dist/node/index.mjs\");\n\nconst SYSTEM_INSTRUCTION = 'You are a helpful AI assistant. Always provide a text response and 2-3 relevant follow-up suggestions that help the user explore the topic deeper or branch the conversation in interesting directions.';\nconst RESPONSE_SCHEMA = {\n    type: _google_genai__WEBPACK_IMPORTED_MODULE_0__.Type.OBJECT,\n    properties: {\n        text: {\n            type: _google_genai__WEBPACK_IMPORTED_MODULE_0__.Type.STRING,\n            description: 'The main text response from the AI.'\n        },\n        suggestions: {\n            type: _google_genai__WEBPACK_IMPORTED_MODULE_0__.Type.ARRAY,\n            items: {\n                type: _google_genai__WEBPACK_IMPORTED_MODULE_0__.Type.OBJECT,\n                properties: {\n                    label: {\n                        type: _google_genai__WEBPACK_IMPORTED_MODULE_0__.Type.STRING,\n                        description: 'A short, catchy label for the suggestion button.'\n                    },\n                    prompt: {\n                        type: _google_genai__WEBPACK_IMPORTED_MODULE_0__.Type.STRING,\n                        description: 'The full prompt that will be sent if the user clicks this suggestion.'\n                    }\n                },\n                required: [\n                    'label',\n                    'prompt'\n                ]\n            },\n            description: 'A list of 2-3 suggested follow-up actions or questions.'\n        }\n    },\n    required: [\n        'text',\n        'suggestions'\n    ]\n};\nlet ai = null;\nfunction safeParseResponse(text) {\n    try {\n        const parsed = JSON.parse(text || '{}');\n        if (parsed && typeof parsed.text === 'string' && Array.isArray(parsed.suggestions)) {\n            return parsed;\n        }\n    } catch  {}\n    return {\n        text: text || \"I'm sorry, I couldn't generate a response.\",\n        suggestions: []\n    };\n}\nfunction getGeminiApiKey() {\n    return process.env.GEMINI_API_KEY || process.env.AI_STUDIO_API_KEY;\n}\nasync function generateWithGemini(history, content) {\n    const apiKey = getGeminiApiKey();\n    if (!apiKey) {\n        throw new Error('GEMINI_API_KEY (or AI_STUDIO_API_KEY) not configured on server.');\n    }\n    if (!ai) {\n        ai = new _google_genai__WEBPACK_IMPORTED_MODULE_0__.GoogleGenAI({\n            apiKey\n        });\n    }\n    const response = await ai.models.generateContent({\n        model: process.env.GEMINI_MODEL || 'gemini-3-flash-preview',\n        contents: [\n            ...history,\n            {\n                role: 'user',\n                parts: [\n                    {\n                        text: content\n                    }\n                ]\n            }\n        ],\n        config: {\n            responseMimeType: 'application/json',\n            responseSchema: RESPONSE_SCHEMA,\n            systemInstruction: SYSTEM_INSTRUCTION\n        }\n    });\n    return safeParseResponse(response.text);\n}\nasync function generateWithOpenAI(history, content) {\n    const apiKey = process.env.OPENAI_API_KEY;\n    if (!apiKey) {\n        throw new Error('OPENAI_API_KEY not configured on server.');\n    }\n    const messages = [\n        {\n            role: 'system',\n            content: SYSTEM_INSTRUCTION\n        },\n        ...history.map((item)=>({\n                role: item.role === 'model' ? 'assistant' : 'user',\n                content: item.parts?.[0]?.text || ''\n            })),\n        {\n            role: 'user',\n            content\n        }\n    ];\n    const response = await fetch('https://api.openai.com/v1/chat/completions', {\n        method: 'POST',\n        headers: {\n            'Content-Type': 'application/json',\n            Authorization: `Bearer ${apiKey}`\n        },\n        body: JSON.stringify({\n            model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',\n            messages,\n            response_format: {\n                type: 'json_schema',\n                json_schema: {\n                    name: 'branchchat_response',\n                    schema: {\n                        type: 'object',\n                        properties: {\n                            text: {\n                                type: 'string'\n                            },\n                            suggestions: {\n                                type: 'array',\n                                items: {\n                                    type: 'object',\n                                    properties: {\n                                        label: {\n                                            type: 'string'\n                                        },\n                                        prompt: {\n                                            type: 'string'\n                                        }\n                                    },\n                                    required: [\n                                        'label',\n                                        'prompt'\n                                    ]\n                                }\n                            }\n                        },\n                        required: [\n                            'text',\n                            'suggestions'\n                        ],\n                        additionalProperties: false\n                    }\n                }\n            }\n        })\n    });\n    if (!response.ok) {\n        const text = await response.text();\n        throw new Error(`OpenAI request failed: ${text}`);\n    }\n    const result = await response.json();\n    const rawContent = result?.choices?.[0]?.message?.content;\n    return safeParseResponse(rawContent);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYWkudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWtEO0FBRWxELE1BQU1FLHFCQUNKO0FBRUYsTUFBTUMsa0JBQWtCO0lBQ3RCQyxNQUFNSCwrQ0FBSUEsQ0FBQ0ksTUFBTTtJQUNqQkMsWUFBWTtRQUNWQyxNQUFNO1lBQ0pILE1BQU1ILCtDQUFJQSxDQUFDTyxNQUFNO1lBQ2pCQyxhQUFhO1FBQ2Y7UUFDQUMsYUFBYTtZQUNYTixNQUFNSCwrQ0FBSUEsQ0FBQ1UsS0FBSztZQUNoQkMsT0FBTztnQkFDTFIsTUFBTUgsK0NBQUlBLENBQUNJLE1BQU07Z0JBQ2pCQyxZQUFZO29CQUNWTyxPQUFPO3dCQUNMVCxNQUFNSCwrQ0FBSUEsQ0FBQ08sTUFBTTt3QkFDakJDLGFBQWE7b0JBQ2Y7b0JBQ0FLLFFBQVE7d0JBQ05WLE1BQU1ILCtDQUFJQSxDQUFDTyxNQUFNO3dCQUNqQkMsYUFBYTtvQkFDZjtnQkFDRjtnQkFDQU0sVUFBVTtvQkFBQztvQkFBUztpQkFBUztZQUMvQjtZQUNBTixhQUFhO1FBQ2Y7SUFDRjtJQUNBTSxVQUFVO1FBQUM7UUFBUTtLQUFjO0FBQ25DO0FBRUEsSUFBSUMsS0FBeUI7QUFFN0IsU0FBU0Msa0JBQWtCVixJQUErQjtJQUN4RCxJQUFJO1FBQ0YsTUFBTVcsU0FBU0MsS0FBS0MsS0FBSyxDQUFDYixRQUFRO1FBQ2xDLElBQUlXLFVBQVUsT0FBT0EsT0FBT1gsSUFBSSxLQUFLLFlBQVljLE1BQU1DLE9BQU8sQ0FBQ0osT0FBT1IsV0FBVyxHQUFHO1lBQ2xGLE9BQU9RO1FBQ1Q7SUFDRixFQUFFLE9BQU0sQ0FDUjtJQUVBLE9BQU87UUFDTFgsTUFBTUEsUUFBUTtRQUNkRyxhQUFhLEVBQUU7SUFDakI7QUFDRjtBQUVBLFNBQVNhO0lBQ1AsT0FBT0MsUUFBUUMsR0FBRyxDQUFDQyxjQUFjLElBQUlGLFFBQVFDLEdBQUcsQ0FBQ0UsaUJBQWlCO0FBQ3BFO0FBRU8sZUFBZUMsbUJBQW1CQyxPQUFjLEVBQUVDLE9BQWU7SUFDdEUsTUFBTUMsU0FBU1I7SUFDZixJQUFJLENBQUNRLFFBQVE7UUFDWCxNQUFNLElBQUlDLE1BQU07SUFDbEI7SUFFQSxJQUFJLENBQUNoQixJQUFJO1FBQ1BBLEtBQUssSUFBSWhCLHNEQUFXQSxDQUFDO1lBQUUrQjtRQUFPO0lBQ2hDO0lBRUEsTUFBTUUsV0FBVyxNQUFNakIsR0FBR2tCLE1BQU0sQ0FBQ0MsZUFBZSxDQUFDO1FBQy9DQyxPQUFPWixRQUFRQyxHQUFHLENBQUNZLFlBQVksSUFBSTtRQUNuQ0MsVUFBVTtlQUFJVDtZQUFTO2dCQUFFVSxNQUFNO2dCQUFRQyxPQUFPO29CQUFDO3dCQUFFakMsTUFBTXVCO29CQUFRO2lCQUFFO1lBQUM7U0FBRTtRQUNwRVcsUUFBUTtZQUNOQyxrQkFBa0I7WUFDbEJDLGdCQUFnQnhDO1lBQ2hCeUMsbUJBQW1CMUM7UUFDckI7SUFDRjtJQUVBLE9BQU9lLGtCQUFrQmdCLFNBQVMxQixJQUFJO0FBQ3hDO0FBRU8sZUFBZXNDLG1CQUFtQmhCLE9BQWMsRUFBRUMsT0FBZTtJQUN0RSxNQUFNQyxTQUFTUCxRQUFRQyxHQUFHLENBQUNxQixjQUFjO0lBQ3pDLElBQUksQ0FBQ2YsUUFBUTtRQUNYLE1BQU0sSUFBSUMsTUFBTTtJQUNsQjtJQUVBLE1BQU1lLFdBQVc7UUFDZjtZQUFFUixNQUFNO1lBQVVULFNBQVM1QjtRQUFtQjtXQUMzQzJCLFFBQVFtQixHQUFHLENBQUMsQ0FBQ0MsT0FBVTtnQkFDeEJWLE1BQU1VLEtBQUtWLElBQUksS0FBSyxVQUFVLGNBQWM7Z0JBQzVDVCxTQUFTbUIsS0FBS1QsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFakMsUUFBUTtZQUNwQztRQUNBO1lBQUVnQyxNQUFNO1lBQVFUO1FBQVE7S0FDekI7SUFFRCxNQUFNRyxXQUFXLE1BQU1pQixNQUFNLDhDQUE4QztRQUN6RUMsUUFBUTtRQUNSQyxTQUFTO1lBQ1AsZ0JBQWdCO1lBQ2hCQyxlQUFlLENBQUMsT0FBTyxFQUFFdEIsUUFBUTtRQUNuQztRQUNBdUIsTUFBTW5DLEtBQUtvQyxTQUFTLENBQUM7WUFDbkJuQixPQUFPWixRQUFRQyxHQUFHLENBQUMrQixZQUFZLElBQUk7WUFDbkNUO1lBQ0FVLGlCQUFpQjtnQkFDZnJELE1BQU07Z0JBQ05zRCxhQUFhO29CQUNYQyxNQUFNO29CQUNOQyxRQUFRO3dCQUNOeEQsTUFBTTt3QkFDTkUsWUFBWTs0QkFDVkMsTUFBTTtnQ0FBRUgsTUFBTTs0QkFBUzs0QkFDdkJNLGFBQWE7Z0NBQ1hOLE1BQU07Z0NBQ05RLE9BQU87b0NBQ0xSLE1BQU07b0NBQ05FLFlBQVk7d0NBQ1ZPLE9BQU87NENBQUVULE1BQU07d0NBQVM7d0NBQ3hCVSxRQUFROzRDQUFFVixNQUFNO3dDQUFTO29DQUMzQjtvQ0FDQVcsVUFBVTt3Q0FBQzt3Q0FBUztxQ0FBUztnQ0FDL0I7NEJBQ0Y7d0JBQ0Y7d0JBQ0FBLFVBQVU7NEJBQUM7NEJBQVE7eUJBQWM7d0JBQ2pDOEMsc0JBQXNCO29CQUN4QjtnQkFDRjtZQUNGO1FBQ0Y7SUFDRjtJQUVBLElBQUksQ0FBQzVCLFNBQVM2QixFQUFFLEVBQUU7UUFDaEIsTUFBTXZELE9BQU8sTUFBTTBCLFNBQVMxQixJQUFJO1FBQ2hDLE1BQU0sSUFBSXlCLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRXpCLE1BQU07SUFDbEQ7SUFFQSxNQUFNd0QsU0FBYyxNQUFNOUIsU0FBUytCLElBQUk7SUFDdkMsTUFBTUMsYUFBYUYsUUFBUUcsU0FBUyxDQUFDLEVBQUUsRUFBRUMsU0FBU3JDO0lBQ2xELE9BQU9iLGtCQUFrQmdEO0FBQzNCIiwic291cmNlcyI6WyIvVXNlcnMvemhhbmdzL2lpdGcyNTEvYnJhbmNoY2hhdC12aXN1YWxpemVyL2xpYi9haS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHb29nbGVHZW5BSSwgVHlwZSB9IGZyb20gJ0Bnb29nbGUvZ2VuYWknO1xuXG5jb25zdCBTWVNURU1fSU5TVFJVQ1RJT04gPVxuICAnWW91IGFyZSBhIGhlbHBmdWwgQUkgYXNzaXN0YW50LiBBbHdheXMgcHJvdmlkZSBhIHRleHQgcmVzcG9uc2UgYW5kIDItMyByZWxldmFudCBmb2xsb3ctdXAgc3VnZ2VzdGlvbnMgdGhhdCBoZWxwIHRoZSB1c2VyIGV4cGxvcmUgdGhlIHRvcGljIGRlZXBlciBvciBicmFuY2ggdGhlIGNvbnZlcnNhdGlvbiBpbiBpbnRlcmVzdGluZyBkaXJlY3Rpb25zLic7XG5cbmNvbnN0IFJFU1BPTlNFX1NDSEVNQSA9IHtcbiAgdHlwZTogVHlwZS5PQkpFQ1QsXG4gIHByb3BlcnRpZXM6IHtcbiAgICB0ZXh0OiB7XG4gICAgICB0eXBlOiBUeXBlLlNUUklORyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIG1haW4gdGV4dCByZXNwb25zZSBmcm9tIHRoZSBBSS4nLFxuICAgIH0sXG4gICAgc3VnZ2VzdGlvbnM6IHtcbiAgICAgIHR5cGU6IFR5cGUuQVJSQVksXG4gICAgICBpdGVtczoge1xuICAgICAgICB0eXBlOiBUeXBlLk9CSkVDVCxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICB0eXBlOiBUeXBlLlNUUklORyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQSBzaG9ydCwgY2F0Y2h5IGxhYmVsIGZvciB0aGUgc3VnZ2VzdGlvbiBidXR0b24uJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByb21wdDoge1xuICAgICAgICAgICAgdHlwZTogVHlwZS5TVFJJTkcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1RoZSBmdWxsIHByb21wdCB0aGF0IHdpbGwgYmUgc2VudCBpZiB0aGUgdXNlciBjbGlja3MgdGhpcyBzdWdnZXN0aW9uLicsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgcmVxdWlyZWQ6IFsnbGFiZWwnLCAncHJvbXB0J10sXG4gICAgICB9LFxuICAgICAgZGVzY3JpcHRpb246ICdBIGxpc3Qgb2YgMi0zIHN1Z2dlc3RlZCBmb2xsb3ctdXAgYWN0aW9ucyBvciBxdWVzdGlvbnMuJyxcbiAgICB9LFxuICB9LFxuICByZXF1aXJlZDogWyd0ZXh0JywgJ3N1Z2dlc3Rpb25zJ10sXG59O1xuXG5sZXQgYWk6IEdvb2dsZUdlbkFJIHwgbnVsbCA9IG51bGw7XG5cbmZ1bmN0aW9uIHNhZmVQYXJzZVJlc3BvbnNlKHRleHQ6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKHRleHQgfHwgJ3t9Jyk7XG4gICAgaWYgKHBhcnNlZCAmJiB0eXBlb2YgcGFyc2VkLnRleHQgPT09ICdzdHJpbmcnICYmIEFycmF5LmlzQXJyYXkocGFyc2VkLnN1Z2dlc3Rpb25zKSkge1xuICAgICAgcmV0dXJuIHBhcnNlZDtcbiAgICB9XG4gIH0gY2F0Y2gge1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB0ZXh0OiB0ZXh0IHx8IFwiSSdtIHNvcnJ5LCBJIGNvdWxkbid0IGdlbmVyYXRlIGEgcmVzcG9uc2UuXCIsXG4gICAgc3VnZ2VzdGlvbnM6IFtdLFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRHZW1pbmlBcGlLZXkoKSB7XG4gIHJldHVybiBwcm9jZXNzLmVudi5HRU1JTklfQVBJX0tFWSB8fCBwcm9jZXNzLmVudi5BSV9TVFVESU9fQVBJX0tFWTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlV2l0aEdlbWluaShoaXN0b3J5OiBhbnlbXSwgY29udGVudDogc3RyaW5nKSB7XG4gIGNvbnN0IGFwaUtleSA9IGdldEdlbWluaUFwaUtleSgpO1xuICBpZiAoIWFwaUtleSkge1xuICAgIHRocm93IG5ldyBFcnJvcignR0VNSU5JX0FQSV9LRVkgKG9yIEFJX1NUVURJT19BUElfS0VZKSBub3QgY29uZmlndXJlZCBvbiBzZXJ2ZXIuJyk7XG4gIH1cblxuICBpZiAoIWFpKSB7XG4gICAgYWkgPSBuZXcgR29vZ2xlR2VuQUkoeyBhcGlLZXkgfSk7XG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFpLm1vZGVscy5nZW5lcmF0ZUNvbnRlbnQoe1xuICAgIG1vZGVsOiBwcm9jZXNzLmVudi5HRU1JTklfTU9ERUwgfHwgJ2dlbWluaS0zLWZsYXNoLXByZXZpZXcnLFxuICAgIGNvbnRlbnRzOiBbLi4uaGlzdG9yeSwgeyByb2xlOiAndXNlcicsIHBhcnRzOiBbeyB0ZXh0OiBjb250ZW50IH1dIH1dLFxuICAgIGNvbmZpZzoge1xuICAgICAgcmVzcG9uc2VNaW1lVHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgcmVzcG9uc2VTY2hlbWE6IFJFU1BPTlNFX1NDSEVNQSxcbiAgICAgIHN5c3RlbUluc3RydWN0aW9uOiBTWVNURU1fSU5TVFJVQ1RJT04sXG4gICAgfSxcbiAgfSk7XG5cbiAgcmV0dXJuIHNhZmVQYXJzZVJlc3BvbnNlKHJlc3BvbnNlLnRleHQpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVXaXRoT3BlbkFJKGhpc3Rvcnk6IGFueVtdLCBjb250ZW50OiBzdHJpbmcpIHtcbiAgY29uc3QgYXBpS2V5ID0gcHJvY2Vzcy5lbnYuT1BFTkFJX0FQSV9LRVk7XG4gIGlmICghYXBpS2V5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdPUEVOQUlfQVBJX0tFWSBub3QgY29uZmlndXJlZCBvbiBzZXJ2ZXIuJyk7XG4gIH1cblxuICBjb25zdCBtZXNzYWdlcyA9IFtcbiAgICB7IHJvbGU6ICdzeXN0ZW0nLCBjb250ZW50OiBTWVNURU1fSU5TVFJVQ1RJT04gfSxcbiAgICAuLi5oaXN0b3J5Lm1hcCgoaXRlbSkgPT4gKHtcbiAgICAgIHJvbGU6IGl0ZW0ucm9sZSA9PT0gJ21vZGVsJyA/ICdhc3Npc3RhbnQnIDogJ3VzZXInLFxuICAgICAgY29udGVudDogaXRlbS5wYXJ0cz8uWzBdPy50ZXh0IHx8ICcnLFxuICAgIH0pKSxcbiAgICB7IHJvbGU6ICd1c2VyJywgY29udGVudCB9LFxuICBdO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vYXBpLm9wZW5haS5jb20vdjEvY2hhdC9jb21wbGV0aW9ucycsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2FwaUtleX1gLFxuICAgIH0sXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgbW9kZWw6IHByb2Nlc3MuZW52Lk9QRU5BSV9NT0RFTCB8fCAnZ3B0LTQuMS1taW5pJyxcbiAgICAgIG1lc3NhZ2VzLFxuICAgICAgcmVzcG9uc2VfZm9ybWF0OiB7XG4gICAgICAgIHR5cGU6ICdqc29uX3NjaGVtYScsXG4gICAgICAgIGpzb25fc2NoZW1hOiB7XG4gICAgICAgICAgbmFtZTogJ2JyYW5jaGNoYXRfcmVzcG9uc2UnLFxuICAgICAgICAgIHNjaGVtYToge1xuICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgIHRleHQ6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgc3VnZ2VzdGlvbnM6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiB7XG4gICAgICAgICAgICAgICAgICB0eXBlOiAnb2JqZWN0JyxcbiAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgbGFiZWw6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgcHJvbXB0OiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgcmVxdWlyZWQ6IFsnbGFiZWwnLCAncHJvbXB0J10sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZXF1aXJlZDogWyd0ZXh0JywgJ3N1Z2dlc3Rpb25zJ10sXG4gICAgICAgICAgICBhZGRpdGlvbmFsUHJvcGVydGllczogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gIH0pO1xuXG4gIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICBjb25zdCB0ZXh0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgIHRocm93IG5ldyBFcnJvcihgT3BlbkFJIHJlcXVlc3QgZmFpbGVkOiAke3RleHR9YCk7XG4gIH1cblxuICBjb25zdCByZXN1bHQ6IGFueSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgY29uc3QgcmF3Q29udGVudCA9IHJlc3VsdD8uY2hvaWNlcz8uWzBdPy5tZXNzYWdlPy5jb250ZW50O1xuICByZXR1cm4gc2FmZVBhcnNlUmVzcG9uc2UocmF3Q29udGVudCk7XG59XG4iXSwibmFtZXMiOlsiR29vZ2xlR2VuQUkiLCJUeXBlIiwiU1lTVEVNX0lOU1RSVUNUSU9OIiwiUkVTUE9OU0VfU0NIRU1BIiwidHlwZSIsIk9CSkVDVCIsInByb3BlcnRpZXMiLCJ0ZXh0IiwiU1RSSU5HIiwiZGVzY3JpcHRpb24iLCJzdWdnZXN0aW9ucyIsIkFSUkFZIiwiaXRlbXMiLCJsYWJlbCIsInByb21wdCIsInJlcXVpcmVkIiwiYWkiLCJzYWZlUGFyc2VSZXNwb25zZSIsInBhcnNlZCIsIkpTT04iLCJwYXJzZSIsIkFycmF5IiwiaXNBcnJheSIsImdldEdlbWluaUFwaUtleSIsInByb2Nlc3MiLCJlbnYiLCJHRU1JTklfQVBJX0tFWSIsIkFJX1NUVURJT19BUElfS0VZIiwiZ2VuZXJhdGVXaXRoR2VtaW5pIiwiaGlzdG9yeSIsImNvbnRlbnQiLCJhcGlLZXkiLCJFcnJvciIsInJlc3BvbnNlIiwibW9kZWxzIiwiZ2VuZXJhdGVDb250ZW50IiwibW9kZWwiLCJHRU1JTklfTU9ERUwiLCJjb250ZW50cyIsInJvbGUiLCJwYXJ0cyIsImNvbmZpZyIsInJlc3BvbnNlTWltZVR5cGUiLCJyZXNwb25zZVNjaGVtYSIsInN5c3RlbUluc3RydWN0aW9uIiwiZ2VuZXJhdGVXaXRoT3BlbkFJIiwiT1BFTkFJX0FQSV9LRVkiLCJtZXNzYWdlcyIsIm1hcCIsIml0ZW0iLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwiYm9keSIsInN0cmluZ2lmeSIsIk9QRU5BSV9NT0RFTCIsInJlc3BvbnNlX2Zvcm1hdCIsImpzb25fc2NoZW1hIiwibmFtZSIsInNjaGVtYSIsImFkZGl0aW9uYWxQcm9wZXJ0aWVzIiwib2siLCJyZXN1bHQiLCJqc29uIiwicmF3Q29udGVudCIsImNob2ljZXMiLCJtZXNzYWdlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/ai.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createAuthToken: () => (/* binding */ createAuthToken),\n/* harmony export */   createPasswordHash: () => (/* binding */ createPasswordHash),\n/* harmony export */   createSessionForUser: () => (/* binding */ createSessionForUser),\n/* harmony export */   getAuthContext: () => (/* binding */ getAuthContext),\n/* harmony export */   sanitizeEmail: () => (/* binding */ sanitizeEmail),\n/* harmony export */   validatePassword: () => (/* binding */ validatePassword),\n/* harmony export */   verifyPassword: () => (/* binding */ verifyPassword)\n/* harmony export */ });\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _mongodb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mongodb */ \"(rsc)/./lib/mongodb.ts\");\n\n\nfunction sanitizeEmail(email) {\n    return typeof email === 'string' ? email.trim().toLowerCase() : '';\n}\nfunction validatePassword(password) {\n    return typeof password === 'string' && password.length >= 6;\n}\nfunction createPasswordHash(password) {\n    const salt = crypto__WEBPACK_IMPORTED_MODULE_0___default().randomBytes(16).toString('hex');\n    const digest = crypto__WEBPACK_IMPORTED_MODULE_0___default().scryptSync(password, salt, 64).toString('hex');\n    return `${salt}:${digest}`;\n}\nfunction verifyPassword(password, storedHash) {\n    const [salt, digest] = storedHash.split(':');\n    if (!salt || !digest) {\n        return false;\n    }\n    const computed = crypto__WEBPACK_IMPORTED_MODULE_0___default().scryptSync(password, salt, 64);\n    const expected = Buffer.from(digest, 'hex');\n    if (computed.length !== expected.length) {\n        return false;\n    }\n    return crypto__WEBPACK_IMPORTED_MODULE_0___default().timingSafeEqual(computed, expected);\n}\nfunction createAuthToken() {\n    return crypto__WEBPACK_IMPORTED_MODULE_0___default().randomBytes(32).toString('hex');\n}\nfunction readBearerToken(request) {\n    const header = request.headers.get('authorization') || '';\n    if (!header.startsWith('Bearer ')) {\n        return null;\n    }\n    return header.slice(7).trim() || null;\n}\nasync function getAuthContext(request) {\n    await (0,_mongodb__WEBPACK_IMPORTED_MODULE_1__.ensureIndexes)();\n    const token = readBearerToken(request);\n    if (!token) {\n        return null;\n    }\n    const db = await (0,_mongodb__WEBPACK_IMPORTED_MODULE_1__.getDb)();\n    const session = await db.collection('auth_sessions').findOne({\n        token\n    });\n    if (!session || session.expiresAt.getTime() < Date.now()) {\n        return null;\n    }\n    const user = await db.collection('users').findOne({\n        _id: session.userId\n    });\n    if (!user) {\n        return null;\n    }\n    return {\n        token,\n        userId: user._id,\n        email: user.email\n    };\n}\nasync function createSessionForUser(userId) {\n    await (0,_mongodb__WEBPACK_IMPORTED_MODULE_1__.ensureIndexes)();\n    const token = createAuthToken();\n    const now = new Date();\n    const expiresAt = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 30);\n    const db = await (0,_mongodb__WEBPACK_IMPORTED_MODULE_1__.getDb)();\n    await db.collection('auth_sessions').insertOne({\n        token,\n        userId,\n        createdAt: now,\n        expiresAt\n    });\n    return token;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcnlwdG8gZnJvbSAnY3J5cHRvJztcbmltcG9ydCB7IE9iamVjdElkIH0gZnJvbSAnbW9uZ29kYic7XG5pbXBvcnQgeyBOZXh0UmVxdWVzdCB9IGZyb20gJ25leHQvc2VydmVyJztcbmltcG9ydCB7IGVuc3VyZUluZGV4ZXMsIGdldERiIH0gZnJvbSAnLi9tb25nb2RiJztcblxuaW50ZXJmYWNlIFVzZXJEb2Mge1xuICBfaWQ6IE9iamVjdElkO1xuICBlbWFpbDogc3RyaW5nO1xuICBwYXNzd29yZEhhc2g6IHN0cmluZztcbiAgY3JlYXRlZEF0OiBEYXRlO1xufVxuXG5pbnRlcmZhY2UgQXV0aFNlc3Npb25Eb2Mge1xuICB0b2tlbjogc3RyaW5nO1xuICB1c2VySWQ6IE9iamVjdElkO1xuICBleHBpcmVzQXQ6IERhdGU7XG4gIGNyZWF0ZWRBdDogRGF0ZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBdXRoQ29udGV4dCB7XG4gIHRva2VuOiBzdHJpbmc7XG4gIHVzZXJJZDogT2JqZWN0SWQ7XG4gIGVtYWlsOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYW5pdGl6ZUVtYWlsKGVtYWlsOiB1bmtub3duKSB7XG4gIHJldHVybiB0eXBlb2YgZW1haWwgPT09ICdzdHJpbmcnID8gZW1haWwudHJpbSgpLnRvTG93ZXJDYXNlKCkgOiAnJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlUGFzc3dvcmQocGFzc3dvcmQ6IHVua25vd24pIHtcbiAgcmV0dXJuIHR5cGVvZiBwYXNzd29yZCA9PT0gJ3N0cmluZycgJiYgcGFzc3dvcmQubGVuZ3RoID49IDY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVQYXNzd29yZEhhc2gocGFzc3dvcmQ6IHN0cmluZykge1xuICBjb25zdCBzYWx0ID0gY3J5cHRvLnJhbmRvbUJ5dGVzKDE2KS50b1N0cmluZygnaGV4Jyk7XG4gIGNvbnN0IGRpZ2VzdCA9IGNyeXB0by5zY3J5cHRTeW5jKHBhc3N3b3JkLCBzYWx0LCA2NCkudG9TdHJpbmcoJ2hleCcpO1xuICByZXR1cm4gYCR7c2FsdH06JHtkaWdlc3R9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeVBhc3N3b3JkKHBhc3N3b3JkOiBzdHJpbmcsIHN0b3JlZEhhc2g6IHN0cmluZykge1xuICBjb25zdCBbc2FsdCwgZGlnZXN0XSA9IHN0b3JlZEhhc2guc3BsaXQoJzonKTtcbiAgaWYgKCFzYWx0IHx8ICFkaWdlc3QpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBjb21wdXRlZCA9IGNyeXB0by5zY3J5cHRTeW5jKHBhc3N3b3JkLCBzYWx0LCA2NCk7XG4gIGNvbnN0IGV4cGVjdGVkID0gQnVmZmVyLmZyb20oZGlnZXN0LCAnaGV4Jyk7XG5cbiAgaWYgKGNvbXB1dGVkLmxlbmd0aCAhPT0gZXhwZWN0ZWQubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGNyeXB0by50aW1pbmdTYWZlRXF1YWwoY29tcHV0ZWQsIGV4cGVjdGVkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUF1dGhUb2tlbigpIHtcbiAgcmV0dXJuIGNyeXB0by5yYW5kb21CeXRlcygzMikudG9TdHJpbmcoJ2hleCcpO1xufVxuXG5mdW5jdGlvbiByZWFkQmVhcmVyVG9rZW4ocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcbiAgY29uc3QgaGVhZGVyID0gcmVxdWVzdC5oZWFkZXJzLmdldCgnYXV0aG9yaXphdGlvbicpIHx8ICcnO1xuICBpZiAoIWhlYWRlci5zdGFydHNXaXRoKCdCZWFyZXIgJykpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gaGVhZGVyLnNsaWNlKDcpLnRyaW0oKSB8fCBudWxsO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0QXV0aENvbnRleHQocmVxdWVzdDogTmV4dFJlcXVlc3QpOiBQcm9taXNlPEF1dGhDb250ZXh0IHwgbnVsbD4ge1xuICBhd2FpdCBlbnN1cmVJbmRleGVzKCk7XG5cbiAgY29uc3QgdG9rZW4gPSByZWFkQmVhcmVyVG9rZW4ocmVxdWVzdCk7XG4gIGlmICghdG9rZW4pIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGRiID0gYXdhaXQgZ2V0RGIoKTtcblxuICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZGIuY29sbGVjdGlvbjxBdXRoU2Vzc2lvbkRvYz4oJ2F1dGhfc2Vzc2lvbnMnKS5maW5kT25lKHsgdG9rZW4gfSk7XG4gIGlmICghc2Vzc2lvbiB8fCBzZXNzaW9uLmV4cGlyZXNBdC5nZXRUaW1lKCkgPCBEYXRlLm5vdygpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCB1c2VyID0gYXdhaXQgZGIuY29sbGVjdGlvbjxVc2VyRG9jPigndXNlcnMnKS5maW5kT25lKHsgX2lkOiBzZXNzaW9uLnVzZXJJZCB9KTtcbiAgaWYgKCF1c2VyKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHRva2VuLFxuICAgIHVzZXJJZDogdXNlci5faWQsXG4gICAgZW1haWw6IHVzZXIuZW1haWwsXG4gIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVTZXNzaW9uRm9yVXNlcih1c2VySWQ6IE9iamVjdElkKSB7XG4gIGF3YWl0IGVuc3VyZUluZGV4ZXMoKTtcblxuICBjb25zdCB0b2tlbiA9IGNyZWF0ZUF1dGhUb2tlbigpO1xuICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCBleHBpcmVzQXQgPSBuZXcgRGF0ZShub3cuZ2V0VGltZSgpICsgMTAwMCAqIDYwICogNjAgKiAyNCAqIDMwKTtcblxuICBjb25zdCBkYiA9IGF3YWl0IGdldERiKCk7XG4gIGF3YWl0IGRiLmNvbGxlY3Rpb248QXV0aFNlc3Npb25Eb2M+KCdhdXRoX3Nlc3Npb25zJykuaW5zZXJ0T25lKHtcbiAgICB0b2tlbixcbiAgICB1c2VySWQsXG4gICAgY3JlYXRlZEF0OiBub3csXG4gICAgZXhwaXJlc0F0LFxuICB9KTtcblxuICByZXR1cm4gdG9rZW47XG59XG4iXSwibmFtZXMiOlsiY3J5cHRvIiwiZW5zdXJlSW5kZXhlcyIsImdldERiIiwic2FuaXRpemVFbWFpbCIsImVtYWlsIiwidHJpbSIsInRvTG93ZXJDYXNlIiwidmFsaWRhdGVQYXNzd29yZCIsInBhc3N3b3JkIiwibGVuZ3RoIiwiY3JlYXRlUGFzc3dvcmRIYXNoIiwic2FsdCIsInJhbmRvbUJ5dGVzIiwidG9TdHJpbmciLCJkaWdlc3QiLCJzY3J5cHRTeW5jIiwidmVyaWZ5UGFzc3dvcmQiLCJzdG9yZWRIYXNoIiwic3BsaXQiLCJjb21wdXRlZCIsImV4cGVjdGVkIiwiQnVmZmVyIiwiZnJvbSIsInRpbWluZ1NhZmVFcXVhbCIsImNyZWF0ZUF1dGhUb2tlbiIsInJlYWRCZWFyZXJUb2tlbiIsInJlcXVlc3QiLCJoZWFkZXIiLCJoZWFkZXJzIiwiZ2V0Iiwic3RhcnRzV2l0aCIsInNsaWNlIiwiZ2V0QXV0aENvbnRleHQiLCJ0b2tlbiIsImRiIiwic2Vzc2lvbiIsImNvbGxlY3Rpb24iLCJmaW5kT25lIiwiZXhwaXJlc0F0IiwiZ2V0VGltZSIsIkRhdGUiLCJub3ciLCJ1c2VyIiwiX2lkIiwidXNlcklkIiwiY3JlYXRlU2Vzc2lvbkZvclVzZXIiLCJpbnNlcnRPbmUiLCJjcmVhdGVkQXQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/mongodb.ts":
/*!************************!*\
  !*** ./lib/mongodb.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ensureIndexes: () => (/* binding */ ensureIndexes),\n/* harmony export */   getDb: () => (/* binding */ getDb)\n/* harmony export */ });\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ \"mongodb\");\n/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);\n\nconst dbName = process.env.MONGODB_DB_NAME || 'branchchat';\nfunction getClientPromise() {\n    if (!global.__mongoClientPromise) {\n        const uri = process.env.MONGODB_URI;\n        if (!uri) {\n            throw new Error('MONGODB_URI is not configured.');\n        }\n        global.__mongoClientPromise = new mongodb__WEBPACK_IMPORTED_MODULE_0__.MongoClient(uri).connect();\n    }\n    return global.__mongoClientPromise;\n}\nlet indexesEnsured = false;\nasync function getDb() {\n    const client = await getClientPromise();\n    return client.db(dbName);\n}\nasync function ensureIndexes() {\n    if (indexesEnsured) {\n        return;\n    }\n    const db = await getDb();\n    await Promise.all([\n        db.collection('users').createIndex({\n            email: 1\n        }, {\n            unique: true\n        }),\n        db.collection('auth_sessions').createIndex({\n            token: 1\n        }, {\n            unique: true\n        }),\n        db.collection('auth_sessions').createIndex({\n            expiresAt: 1\n        }, {\n            expireAfterSeconds: 0\n        }),\n        db.collection('chat_sessions').createIndex({\n            userId: 1,\n            updatedAt: -1\n        })\n    ]);\n    indexesEnsured = true;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvbW9uZ29kYi50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQXNDO0FBRXRDLE1BQU1DLFNBQVNDLFFBQVFDLEdBQUcsQ0FBQ0MsZUFBZSxJQUFJO0FBTTlDLFNBQVNDO0lBQ1AsSUFBSSxDQUFDQyxPQUFPQyxvQkFBb0IsRUFBRTtRQUNoQyxNQUFNQyxNQUFNTixRQUFRQyxHQUFHLENBQUNNLFdBQVc7UUFDbkMsSUFBSSxDQUFDRCxLQUFLO1lBQ1IsTUFBTSxJQUFJRSxNQUFNO1FBQ2xCO1FBQ0FKLE9BQU9DLG9CQUFvQixHQUFHLElBQUlQLGdEQUFXQSxDQUFDUSxLQUFLRyxPQUFPO0lBQzVEO0lBQ0EsT0FBT0wsT0FBT0Msb0JBQW9CO0FBQ3BDO0FBRUEsSUFBSUssaUJBQWlCO0FBRWQsZUFBZUM7SUFDcEIsTUFBTUMsU0FBUyxNQUFNVDtJQUNyQixPQUFPUyxPQUFPQyxFQUFFLENBQUNkO0FBQ25CO0FBRU8sZUFBZWU7SUFDcEIsSUFBSUosZ0JBQWdCO1FBQ2xCO0lBQ0Y7SUFFQSxNQUFNRyxLQUFLLE1BQU1GO0lBRWpCLE1BQU1JLFFBQVFDLEdBQUcsQ0FBQztRQUNoQkgsR0FBR0ksVUFBVSxDQUFDLFNBQVNDLFdBQVcsQ0FBQztZQUFFQyxPQUFPO1FBQUUsR0FBRztZQUFFQyxRQUFRO1FBQUs7UUFDaEVQLEdBQUdJLFVBQVUsQ0FBQyxpQkFBaUJDLFdBQVcsQ0FBQztZQUFFRyxPQUFPO1FBQUUsR0FBRztZQUFFRCxRQUFRO1FBQUs7UUFDeEVQLEdBQUdJLFVBQVUsQ0FBQyxpQkFBaUJDLFdBQVcsQ0FBQztZQUFFSSxXQUFXO1FBQUUsR0FBRztZQUFFQyxvQkFBb0I7UUFBRTtRQUNyRlYsR0FBR0ksVUFBVSxDQUFDLGlCQUFpQkMsV0FBVyxDQUFDO1lBQUVNLFFBQVE7WUFBR0MsV0FBVyxDQUFDO1FBQUU7S0FDdkU7SUFFRGYsaUJBQWlCO0FBQ25CIiwic291cmNlcyI6WyIvVXNlcnMvemhhbmdzL2lpdGcyNTEvYnJhbmNoY2hhdC12aXN1YWxpemVyL2xpYi9tb25nb2RiLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbmdvQ2xpZW50IH0gZnJvbSAnbW9uZ29kYic7XG5cbmNvbnN0IGRiTmFtZSA9IHByb2Nlc3MuZW52Lk1PTkdPREJfREJfTkFNRSB8fCAnYnJhbmNoY2hhdCc7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgdmFyIF9fbW9uZ29DbGllbnRQcm9taXNlOiBQcm9taXNlPE1vbmdvQ2xpZW50PiB8IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZ2V0Q2xpZW50UHJvbWlzZSgpIHtcbiAgaWYgKCFnbG9iYWwuX19tb25nb0NsaWVudFByb21pc2UpIHtcbiAgICBjb25zdCB1cmkgPSBwcm9jZXNzLmVudi5NT05HT0RCX1VSSTtcbiAgICBpZiAoIXVyaSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNT05HT0RCX1VSSSBpcyBub3QgY29uZmlndXJlZC4nKTtcbiAgICB9XG4gICAgZ2xvYmFsLl9fbW9uZ29DbGllbnRQcm9taXNlID0gbmV3IE1vbmdvQ2xpZW50KHVyaSkuY29ubmVjdCgpO1xuICB9XG4gIHJldHVybiBnbG9iYWwuX19tb25nb0NsaWVudFByb21pc2U7XG59XG5cbmxldCBpbmRleGVzRW5zdXJlZCA9IGZhbHNlO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0RGIoKSB7XG4gIGNvbnN0IGNsaWVudCA9IGF3YWl0IGdldENsaWVudFByb21pc2UoKTtcbiAgcmV0dXJuIGNsaWVudC5kYihkYk5hbWUpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZW5zdXJlSW5kZXhlcygpIHtcbiAgaWYgKGluZGV4ZXNFbnN1cmVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZGIgPSBhd2FpdCBnZXREYigpO1xuXG4gIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICBkYi5jb2xsZWN0aW9uKCd1c2VycycpLmNyZWF0ZUluZGV4KHsgZW1haWw6IDEgfSwgeyB1bmlxdWU6IHRydWUgfSksXG4gICAgZGIuY29sbGVjdGlvbignYXV0aF9zZXNzaW9ucycpLmNyZWF0ZUluZGV4KHsgdG9rZW46IDEgfSwgeyB1bmlxdWU6IHRydWUgfSksXG4gICAgZGIuY29sbGVjdGlvbignYXV0aF9zZXNzaW9ucycpLmNyZWF0ZUluZGV4KHsgZXhwaXJlc0F0OiAxIH0sIHsgZXhwaXJlQWZ0ZXJTZWNvbmRzOiAwIH0pLFxuICAgIGRiLmNvbGxlY3Rpb24oJ2NoYXRfc2Vzc2lvbnMnKS5jcmVhdGVJbmRleCh7IHVzZXJJZDogMSwgdXBkYXRlZEF0OiAtMSB9KSxcbiAgXSk7XG5cbiAgaW5kZXhlc0Vuc3VyZWQgPSB0cnVlO1xufVxuIl0sIm5hbWVzIjpbIk1vbmdvQ2xpZW50IiwiZGJOYW1lIiwicHJvY2VzcyIsImVudiIsIk1PTkdPREJfREJfTkFNRSIsImdldENsaWVudFByb21pc2UiLCJnbG9iYWwiLCJfX21vbmdvQ2xpZW50UHJvbWlzZSIsInVyaSIsIk1PTkdPREJfVVJJIiwiRXJyb3IiLCJjb25uZWN0IiwiaW5kZXhlc0Vuc3VyZWQiLCJnZXREYiIsImNsaWVudCIsImRiIiwiZW5zdXJlSW5kZXhlcyIsIlByb21pc2UiLCJhbGwiLCJjb2xsZWN0aW9uIiwiY3JlYXRlSW5kZXgiLCJlbWFpbCIsInVuaXF1ZSIsInRva2VuIiwiZXhwaXJlc0F0IiwiZXhwaXJlQWZ0ZXJTZWNvbmRzIiwidXNlcklkIiwidXBkYXRlZEF0Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/mongodb.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=%2FUsers%2Fzhangs%2Fiitg251%2Fbranchchat-visualizer%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fzhangs%2Fiitg251%2Fbranchchat-visualizer&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=%2FUsers%2Fzhangs%2Fiitg251%2Fbranchchat-visualizer%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fzhangs%2Fiitg251%2Fbranchchat-visualizer&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   handler: () => (/* binding */ handler),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/dist/server/request-meta */ \"(rsc)/./node_modules/next/dist/server/request-meta.js\");\n/* harmony import */ var next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/dist/server/lib/trace/tracer */ \"(rsc)/./node_modules/next/dist/server/lib/trace/tracer.js\");\n/* harmony import */ var next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/dist/shared/lib/router/utils/app-paths */ \"next/dist/shared/lib/router/utils/app-paths\");\n/* harmony import */ var next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/dist/server/base-http/node */ \"(rsc)/./node_modules/next/dist/server/base-http/node.js\");\n/* harmony import */ var next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/dist/server/web/spec-extension/adapters/next-request */ \"(rsc)/./node_modules/next/dist/server/web/spec-extension/adapters/next-request.js\");\n/* harmony import */ var next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! next/dist/server/lib/trace/constants */ \"(rsc)/./node_modules/next/dist/server/lib/trace/constants.js\");\n/* harmony import */ var next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/dist/server/instrumentation/utils */ \"(rsc)/./node_modules/next/dist/server/instrumentation/utils.js\");\n/* harmony import */ var next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/dist/server/send-response */ \"(rsc)/./node_modules/next/dist/server/send-response.js\");\n/* harmony import */ var next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! next/dist/server/web/utils */ \"(rsc)/./node_modules/next/dist/server/web/utils.js\");\n/* harmony import */ var next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var next_dist_server_lib_cache_control__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! next/dist/server/lib/cache-control */ \"(rsc)/./node_modules/next/dist/server/lib/cache-control.js\");\n/* harmony import */ var next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! next/dist/lib/constants */ \"(rsc)/./node_modules/next/dist/lib/constants.js\");\n/* harmony import */ var next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! next/dist/shared/lib/no-fallback-error.external */ \"next/dist/shared/lib/no-fallback-error.external\");\n/* harmony import */ var next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! next/dist/server/response-cache */ \"(rsc)/./node_modules/next/dist/server/response-cache/index.js\");\n/* harmony import */ var next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var _Users_zhangs_iitg251_branchchat_visualizer_app_api_chat_route_ts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./app/api/chat/route.ts */ \"(rsc)/./app/api/chat/route.ts\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/chat/route\",\n        pathname: \"/api/chat\",\n        filename: \"route\",\n        bundlePath: \"app/api/chat/route\"\n    },\n    distDir: \".next\" || 0,\n    relativeProjectDir:  false || '',\n    resolvedPagePath: \"/Users/zhangs/iitg251/branchchat-visualizer/app/api/chat/route.ts\",\n    nextConfigOutput,\n    userland: _Users_zhangs_iitg251_branchchat_visualizer_app_api_chat_route_ts__WEBPACK_IMPORTED_MODULE_16__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\nasync function handler(req, res, ctx) {\n    var _nextConfig_experimental;\n    let srcPage = \"/api/chat/route\";\n    // turbopack doesn't normalize `/index` in the page name\n    // so we need to to process dynamic routes properly\n    // TODO: fix turbopack providing differing value from webpack\n    if (false) {} else if (srcPage === '/index') {\n        // we always normalize /index specifically\n        srcPage = '/';\n    }\n    const multiZoneDraftMode = false;\n    const prepareResult = await routeModule.prepare(req, res, {\n        srcPage,\n        multiZoneDraftMode\n    });\n    if (!prepareResult) {\n        res.statusCode = 400;\n        res.end('Bad Request');\n        ctx.waitUntil == null ? void 0 : ctx.waitUntil.call(ctx, Promise.resolve());\n        return null;\n    }\n    const { buildId, params, nextConfig, isDraftMode, prerenderManifest, routerServerContext, isOnDemandRevalidate, revalidateOnlyGenerated, resolvedPathname } = prepareResult;\n    const normalizedSrcPage = (0,next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_5__.normalizeAppPath)(srcPage);\n    let isIsr = Boolean(prerenderManifest.dynamicRoutes[normalizedSrcPage] || prerenderManifest.routes[resolvedPathname]);\n    if (isIsr && !isDraftMode) {\n        const isPrerendered = Boolean(prerenderManifest.routes[resolvedPathname]);\n        const prerenderInfo = prerenderManifest.dynamicRoutes[normalizedSrcPage];\n        if (prerenderInfo) {\n            if (prerenderInfo.fallback === false && !isPrerendered) {\n                throw new next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_14__.NoFallbackError();\n            }\n        }\n    }\n    let cacheKey = null;\n    if (isIsr && !routeModule.isDev && !isDraftMode) {\n        cacheKey = resolvedPathname;\n        // ensure /index and / is normalized to one key\n        cacheKey = cacheKey === '/index' ? '/' : cacheKey;\n    }\n    const supportsDynamicResponse = // If we're in development, we always support dynamic HTML\n    routeModule.isDev === true || // If this is not SSG or does not have static paths, then it supports\n    // dynamic HTML.\n    !isIsr;\n    // This is a revalidation request if the request is for a static\n    // page and it is not being resumed from a postponed render and\n    // it is not a dynamic RSC request then it is a revalidation\n    // request.\n    const isRevalidate = isIsr && !supportsDynamicResponse;\n    const method = req.method || 'GET';\n    const tracer = (0,next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.getTracer)();\n    const activeSpan = tracer.getActiveScopeSpan();\n    const context = {\n        params,\n        prerenderManifest,\n        renderOpts: {\n            experimental: {\n                cacheComponents: Boolean(nextConfig.experimental.cacheComponents),\n                authInterrupts: Boolean(nextConfig.experimental.authInterrupts)\n            },\n            supportsDynamicResponse,\n            incrementalCache: (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'incrementalCache'),\n            cacheLifeProfiles: (_nextConfig_experimental = nextConfig.experimental) == null ? void 0 : _nextConfig_experimental.cacheLife,\n            isRevalidate,\n            waitUntil: ctx.waitUntil,\n            onClose: (cb)=>{\n                res.on('close', cb);\n            },\n            onAfterTaskError: undefined,\n            onInstrumentationRequestError: (error, _request, errorContext)=>routeModule.onRequestError(req, error, errorContext, routerServerContext)\n        },\n        sharedContext: {\n            buildId\n        }\n    };\n    const nodeNextReq = new next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_6__.NodeNextRequest(req);\n    const nodeNextRes = new next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_6__.NodeNextResponse(res);\n    const nextReq = next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_7__.NextRequestAdapter.fromNodeNextRequest(nodeNextReq, (0,next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_7__.signalFromNodeResponse)(res));\n    try {\n        const invokeRouteModule = async (span)=>{\n            return routeModule.handle(nextReq, context).finally(()=>{\n                if (!span) return;\n                span.setAttributes({\n                    'http.status_code': res.statusCode,\n                    'next.rsc': false\n                });\n                const rootSpanAttributes = tracer.getRootSpanAttributes();\n                // We were unable to get attributes, probably OTEL is not enabled\n                if (!rootSpanAttributes) {\n                    return;\n                }\n                if (rootSpanAttributes.get('next.span_type') !== next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_8__.BaseServerSpan.handleRequest) {\n                    console.warn(`Unexpected root span type '${rootSpanAttributes.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`);\n                    return;\n                }\n                const route = rootSpanAttributes.get('next.route');\n                if (route) {\n                    const name = `${method} ${route}`;\n                    span.setAttributes({\n                        'next.route': route,\n                        'http.route': route,\n                        'next.span_name': name\n                    });\n                    span.updateName(name);\n                } else {\n                    span.updateName(`${method} ${req.url}`);\n                }\n            });\n        };\n        const handleResponse = async (currentSpan)=>{\n            var _cacheEntry_value;\n            const responseGenerator = async ({ previousCacheEntry })=>{\n                try {\n                    if (!(0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'minimalMode') && isOnDemandRevalidate && revalidateOnlyGenerated && !previousCacheEntry) {\n                        res.statusCode = 404;\n                        // on-demand revalidate always sets this header\n                        res.setHeader('x-nextjs-cache', 'REVALIDATED');\n                        res.end('This page could not be found');\n                        return null;\n                    }\n                    const response = await invokeRouteModule(currentSpan);\n                    req.fetchMetrics = context.renderOpts.fetchMetrics;\n                    let pendingWaitUntil = context.renderOpts.pendingWaitUntil;\n                    // Attempt using provided waitUntil if available\n                    // if it's not we fallback to sendResponse's handling\n                    if (pendingWaitUntil) {\n                        if (ctx.waitUntil) {\n                            ctx.waitUntil(pendingWaitUntil);\n                            pendingWaitUntil = undefined;\n                        }\n                    }\n                    const cacheTags = context.renderOpts.collectedTags;\n                    // If the request is for a static response, we can cache it so long\n                    // as it's not edge.\n                    if (isIsr) {\n                        const blob = await response.blob();\n                        // Copy the headers from the response.\n                        const headers = (0,next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_11__.toNodeOutgoingHttpHeaders)(response.headers);\n                        if (cacheTags) {\n                            headers[next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__.NEXT_CACHE_TAGS_HEADER] = cacheTags;\n                        }\n                        if (!headers['content-type'] && blob.type) {\n                            headers['content-type'] = blob.type;\n                        }\n                        const revalidate = typeof context.renderOpts.collectedRevalidate === 'undefined' || context.renderOpts.collectedRevalidate >= next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__.INFINITE_CACHE ? false : context.renderOpts.collectedRevalidate;\n                        const expire = typeof context.renderOpts.collectedExpire === 'undefined' || context.renderOpts.collectedExpire >= next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__.INFINITE_CACHE ? undefined : context.renderOpts.collectedExpire;\n                        // Create the cache entry for the response.\n                        const cacheEntry = {\n                            value: {\n                                kind: next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_15__.CachedRouteKind.APP_ROUTE,\n                                status: response.status,\n                                body: Buffer.from(await blob.arrayBuffer()),\n                                headers\n                            },\n                            cacheControl: {\n                                revalidate,\n                                expire\n                            }\n                        };\n                        return cacheEntry;\n                    } else {\n                        // send response without caching if not ISR\n                        await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_10__.sendResponse)(nodeNextReq, nodeNextRes, response, context.renderOpts.pendingWaitUntil);\n                        return null;\n                    }\n                } catch (err) {\n                    // if this is a background revalidate we need to report\n                    // the request error here as it won't be bubbled\n                    if (previousCacheEntry == null ? void 0 : previousCacheEntry.isStale) {\n                        await routeModule.onRequestError(req, err, {\n                            routerKind: 'App Router',\n                            routePath: srcPage,\n                            routeType: 'route',\n                            revalidateReason: (0,next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_9__.getRevalidateReason)({\n                                isRevalidate,\n                                isOnDemandRevalidate\n                            })\n                        }, routerServerContext);\n                    }\n                    throw err;\n                }\n            };\n            const cacheEntry = await routeModule.handleResponse({\n                req,\n                nextConfig,\n                cacheKey,\n                routeKind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n                isFallback: false,\n                prerenderManifest,\n                isRoutePPREnabled: false,\n                isOnDemandRevalidate,\n                revalidateOnlyGenerated,\n                responseGenerator,\n                waitUntil: ctx.waitUntil\n            });\n            // we don't create a cacheEntry for ISR\n            if (!isIsr) {\n                return null;\n            }\n            if ((cacheEntry == null ? void 0 : (_cacheEntry_value = cacheEntry.value) == null ? void 0 : _cacheEntry_value.kind) !== next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_15__.CachedRouteKind.APP_ROUTE) {\n                var _cacheEntry_value1;\n                throw Object.defineProperty(new Error(`Invariant: app-route received invalid cache entry ${cacheEntry == null ? void 0 : (_cacheEntry_value1 = cacheEntry.value) == null ? void 0 : _cacheEntry_value1.kind}`), \"__NEXT_ERROR_CODE\", {\n                    value: \"E701\",\n                    enumerable: false,\n                    configurable: true\n                });\n            }\n            if (!(0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'minimalMode')) {\n                res.setHeader('x-nextjs-cache', isOnDemandRevalidate ? 'REVALIDATED' : cacheEntry.isMiss ? 'MISS' : cacheEntry.isStale ? 'STALE' : 'HIT');\n            }\n            // Draft mode should never be cached\n            if (isDraftMode) {\n                res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');\n            }\n            const headers = (0,next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_11__.fromNodeOutgoingHttpHeaders)(cacheEntry.value.headers);\n            if (!((0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'minimalMode') && isIsr)) {\n                headers.delete(next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_13__.NEXT_CACHE_TAGS_HEADER);\n            }\n            // If cache control is already set on the response we don't\n            // override it to allow users to customize it via next.config\n            if (cacheEntry.cacheControl && !res.getHeader('Cache-Control') && !headers.get('Cache-Control')) {\n                headers.set('Cache-Control', (0,next_dist_server_lib_cache_control__WEBPACK_IMPORTED_MODULE_12__.getCacheControlHeader)(cacheEntry.cacheControl));\n            }\n            await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_10__.sendResponse)(nodeNextReq, nodeNextRes, new Response(cacheEntry.value.body, {\n                headers,\n                status: cacheEntry.value.status || 200\n            }));\n            return null;\n        };\n        // TODO: activeSpan code path is for when wrapped by\n        // next-server can be removed when this is no longer used\n        if (activeSpan) {\n            await handleResponse(activeSpan);\n        } else {\n            await tracer.withPropagatedContext(req.headers, ()=>tracer.trace(next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_8__.BaseServerSpan.handleRequest, {\n                    spanName: `${method} ${req.url}`,\n                    kind: next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.SpanKind.SERVER,\n                    attributes: {\n                        'http.method': method,\n                        'http.target': req.url\n                    }\n                }, handleResponse));\n        }\n    } catch (err) {\n        if (!(err instanceof next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_14__.NoFallbackError)) {\n            await routeModule.onRequestError(req, err, {\n                routerKind: 'App Router',\n                routePath: normalizedSrcPage,\n                routeType: 'route',\n                revalidateReason: (0,next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_9__.getRevalidateReason)({\n                    isRevalidate,\n                    isOnDemandRevalidate\n                })\n            });\n        }\n        // rethrow so that we can handle serving error page\n        // If this is during static generation, throw the error again.\n        if (isIsr) throw err;\n        // Otherwise, send a 500 response.\n        await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_10__.sendResponse)(nodeNextReq, nodeNextRes, new Response(null, {\n            status: 500\n        }));\n        return null;\n    }\n}\n\n//# sourceMappingURL=app-route.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZjaGF0JTJGcm91dGUmcGFnZT0lMkZhcGklMkZjaGF0JTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGY2hhdCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnpoYW5ncyUyRmlpdGcyNTElMkZicmFuY2hjaGF0LXZpc3VhbGl6ZXIlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGemhhbmdzJTJGaWl0ZzI1MSUyRmJyYW5jaGNoYXQtdmlzdWFsaXplciZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCZpc0dsb2JhbE5vdEZvdW5kRW5hYmxlZD0hIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQStGO0FBQ3ZDO0FBQ3FCO0FBQ2Q7QUFDUztBQUNPO0FBQ0s7QUFDbUM7QUFDakQ7QUFDTztBQUNmO0FBQ3NDO0FBQ3pCO0FBQ007QUFDQztBQUNoQjtBQUM0QjtBQUM5RjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxhQUFhLE9BQW9DLElBQUksQ0FBRTtBQUN2RCx3QkFBd0IsTUFBdUM7QUFDL0Q7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxz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YTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDViw2RUFBNkUsZ0ZBQWM7QUFDM0YsaUNBQWlDLFFBQVEsRUFBRSxRQUFRO0FBQ25ELDBCQUEwQix1RUFBUTtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLE1BQU07QUFDTiw2QkFBNkIsNkZBQWU7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsMkZBQW1CO0FBQ3JEO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDZFQUFZO0FBQzFCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCB7IGdldFJlcXVlc3RNZXRhIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcmVxdWVzdC1tZXRhXCI7XG5pbXBvcnQgeyBnZXRUcmFjZXIsIFNwYW5LaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3RyYWNlL3RyYWNlclwiO1xuaW1wb3J0IHsgbm9ybWFsaXplQXBwUGF0aCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9yb3V0ZXIvdXRpbHMvYXBwLXBhdGhzXCI7XG5pbXBvcnQgeyBOb2RlTmV4dFJlcXVlc3QsIE5vZGVOZXh0UmVzcG9uc2UgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9iYXNlLWh0dHAvbm9kZVwiO1xuaW1wb3J0IHsgTmV4dFJlcXVlc3RBZGFwdGVyLCBzaWduYWxGcm9tTm9kZVJlc3BvbnNlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvd2ViL3NwZWMtZXh0ZW5zaW9uL2FkYXB0ZXJzL25leHQtcmVxdWVzdFwiO1xuaW1wb3J0IHsgQmFzZVNlcnZlclNwYW4gfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvdHJhY2UvY29uc3RhbnRzXCI7XG5pbXBvcnQgeyBnZXRSZXZhbGlkYXRlUmVhc29uIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvaW5zdHJ1bWVudGF0aW9uL3V0aWxzXCI7XG5pbXBvcnQgeyBzZW5kUmVzcG9uc2UgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9zZW5kLXJlc3BvbnNlXCI7XG5pbXBvcnQgeyBmcm9tTm9kZU91dGdvaW5nSHR0cEhlYWRlcnMsIHRvTm9kZU91dGdvaW5nSHR0cEhlYWRlcnMgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci93ZWIvdXRpbHNcIjtcbmltcG9ydCB7IGdldENhY2hlQ29udHJvbEhlYWRlciB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9jYWNoZS1jb250cm9sXCI7XG5pbXBvcnQgeyBJTkZJTklURV9DQUNIRSwgTkVYVF9DQUNIRV9UQUdTX0hFQURFUiB9IGZyb20gXCJuZXh0L2Rpc3QvbGliL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgTm9GYWxsYmFja0Vycm9yIH0gZnJvbSBcIm5leHQvZGlzdC9zaGFyZWQvbGliL25vLWZhbGxiYWNrLWVycm9yLmV4dGVybmFsXCI7XG5pbXBvcnQgeyBDYWNoZWRSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yZXNwb25zZS1jYWNoZVwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy96aGFuZ3MvaWl0ZzI1MS9icmFuY2hjaGF0LXZpc3VhbGl6ZXIvYXBwL2FwaS9jaGF0L3JvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9jaGF0L3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvY2hhdFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvY2hhdC9yb3V0ZVwiXG4gICAgfSxcbiAgICBkaXN0RGlyOiBwcm9jZXNzLmVudi5fX05FWFRfUkVMQVRJVkVfRElTVF9ESVIgfHwgJycsXG4gICAgcmVsYXRpdmVQcm9qZWN0RGlyOiBwcm9jZXNzLmVudi5fX05FWFRfUkVMQVRJVkVfUFJPSkVDVF9ESVIgfHwgJycsXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCIvVXNlcnMvemhhbmdzL2lpdGcyNTEvYnJhbmNoY2hhdC12aXN1YWxpemVyL2FwcC9hcGkvY2hhdC9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzLCBjdHgpIHtcbiAgICB2YXIgX25leHRDb25maWdfZXhwZXJpbWVudGFsO1xuICAgIGxldCBzcmNQYWdlID0gXCIvYXBpL2NoYXQvcm91dGVcIjtcbiAgICAvLyB0dXJib3BhY2sgZG9lc24ndCBub3JtYWxpemUgYC9pbmRleGAgaW4gdGhlIHBhZ2UgbmFtZVxuICAgIC8vIHNvIHdlIG5lZWQgdG8gdG8gcHJvY2VzcyBkeW5hbWljIHJvdXRlcyBwcm9wZXJseVxuICAgIC8vIFRPRE86IGZpeCB0dXJib3BhY2sgcHJvdmlkaW5nIGRpZmZlcmluZyB2YWx1ZSBmcm9tIHdlYnBhY2tcbiAgICBpZiAocHJvY2Vzcy5lbnYuVFVSQk9QQUNLKSB7XG4gICAgICAgIHNyY1BhZ2UgPSBzcmNQYWdlLnJlcGxhY2UoL1xcL2luZGV4JC8sICcnKSB8fCAnLyc7XG4gICAgfSBlbHNlIGlmIChzcmNQYWdlID09PSAnL2luZGV4Jykge1xuICAgICAgICAvLyB3ZSBhbHdheXMgbm9ybWFsaXplIC9pbmRleCBzcGVjaWZpY2FsbHlcbiAgICAgICAgc3JjUGFnZSA9ICcvJztcbiAgICB9XG4gICAgY29uc3QgbXVsdGlab25lRHJhZnRNb2RlID0gcHJvY2Vzcy5lbnYuX19ORVhUX01VTFRJX1pPTkVfRFJBRlRfTU9ERTtcbiAgICBjb25zdCBwcmVwYXJlUmVzdWx0ID0gYXdhaXQgcm91dGVNb2R1bGUucHJlcGFyZShyZXEsIHJlcywge1xuICAgICAgICBzcmNQYWdlLFxuICAgICAgICBtdWx0aVpvbmVEcmFmdE1vZGVcbiAgICB9KTtcbiAgICBpZiAoIXByZXBhcmVSZXN1bHQpIHtcbiAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSA0MDA7XG4gICAgICAgIHJlcy5lbmQoJ0JhZCBSZXF1ZXN0Jyk7XG4gICAgICAgIGN0eC53YWl0VW50aWwgPT0gbnVsbCA/IHZvaWQgMCA6IGN0eC53YWl0VW50aWwuY2FsbChjdHgsIFByb21pc2UucmVzb2x2ZSgpKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHsgYnVpbGRJZCwgcGFyYW1zLCBuZXh0Q29uZmlnLCBpc0RyYWZ0TW9kZSwgcHJlcmVuZGVyTWFuaWZlc3QsIHJvdXRlclNlcnZlckNvbnRleHQsIGlzT25EZW1hbmRSZXZhbGlkYXRlLCByZXZhbGlkYXRlT25seUdlbmVyYXRlZCwgcmVzb2x2ZWRQYXRobmFtZSB9ID0gcHJlcGFyZVJlc3VsdDtcbiAgICBjb25zdCBub3JtYWxpemVkU3JjUGFnZSA9IG5vcm1hbGl6ZUFwcFBhdGgoc3JjUGFnZSk7XG4gICAgbGV0IGlzSXNyID0gQm9vbGVhbihwcmVyZW5kZXJNYW5pZmVzdC5keW5hbWljUm91dGVzW25vcm1hbGl6ZWRTcmNQYWdlXSB8fCBwcmVyZW5kZXJNYW5pZmVzdC5yb3V0ZXNbcmVzb2x2ZWRQYXRobmFtZV0pO1xuICAgIGlmIChpc0lzciAmJiAhaXNEcmFmdE1vZGUpIHtcbiAgICAgICAgY29uc3QgaXNQcmVyZW5kZXJlZCA9IEJvb2xlYW4ocHJlcmVuZGVyTWFuaWZlc3Qucm91dGVzW3Jlc29sdmVkUGF0aG5hbWVdKTtcbiAgICAgICAgY29uc3QgcHJlcmVuZGVySW5mbyA9IHByZXJlbmRlck1hbmlmZXN0LmR5bmFtaWNSb3V0ZXNbbm9ybWFsaXplZFNyY1BhZ2VdO1xuICAgICAgICBpZiAocHJlcmVuZGVySW5mbykge1xuICAgICAgICAgICAgaWYgKHByZXJlbmRlckluZm8uZmFsbGJhY2sgPT09IGZhbHNlICYmICFpc1ByZXJlbmRlcmVkKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IE5vRmFsbGJhY2tFcnJvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBjYWNoZUtleSA9IG51bGw7XG4gICAgaWYgKGlzSXNyICYmICFyb3V0ZU1vZHVsZS5pc0RldiAmJiAhaXNEcmFmdE1vZGUpIHtcbiAgICAgICAgY2FjaGVLZXkgPSByZXNvbHZlZFBhdGhuYW1lO1xuICAgICAgICAvLyBlbnN1cmUgL2luZGV4IGFuZCAvIGlzIG5vcm1hbGl6ZWQgdG8gb25lIGtleVxuICAgICAgICBjYWNoZUtleSA9IGNhY2hlS2V5ID09PSAnL2luZGV4JyA/ICcvJyA6IGNhY2hlS2V5O1xuICAgIH1cbiAgICBjb25zdCBzdXBwb3J0c0R5bmFtaWNSZXNwb25zZSA9IC8vIElmIHdlJ3JlIGluIGRldmVsb3BtZW50LCB3ZSBhbHdheXMgc3VwcG9ydCBkeW5hbWljIEhUTUxcbiAgICByb3V0ZU1vZHVsZS5pc0RldiA9PT0gdHJ1ZSB8fCAvLyBJZiB0aGlzIGlzIG5vdCBTU0cgb3IgZG9lcyBub3QgaGF2ZSBzdGF0aWMgcGF0aHMsIHRoZW4gaXQgc3VwcG9ydHNcbiAgICAvLyBkeW5hbWljIEhUTUwuXG4gICAgIWlzSXNyO1xuICAgIC8vIFRoaXMgaXMgYSByZXZhbGlkYXRpb24gcmVxdWVzdCBpZiB0aGUgcmVxdWVzdCBpcyBmb3IgYSBzdGF0aWNcbiAgICAvLyBwYWdlIGFuZCBpdCBpcyBub3QgYmVpbmcgcmVzdW1lZCBmcm9tIGEgcG9zdHBvbmVkIHJlbmRlciBhbmRcbiAgICAvLyBpdCBpcyBub3QgYSBkeW5hbWljIFJTQyByZXF1ZXN0IHRoZW4gaXQgaXMgYSByZXZhbGlkYXRpb25cbiAgICAvLyByZXF1ZXN0LlxuICAgIGNvbnN0IGlzUmV2YWxpZGF0ZSA9IGlzSXNyICYmICFzdXBwb3J0c0R5bmFtaWNSZXNwb25zZTtcbiAgICBjb25zdCBtZXRob2QgPSByZXEubWV0aG9kIHx8ICdHRVQnO1xuICAgIGNvbnN0IHRyYWNlciA9IGdldFRyYWNlcigpO1xuICAgIGNvbnN0IGFjdGl2ZVNwYW4gPSB0cmFjZXIuZ2V0QWN0aXZlU2NvcGVTcGFuKCk7XG4gICAgY29uc3QgY29udGV4dCA9IHtcbiAgICAgICAgcGFyYW1zLFxuICAgICAgICBwcmVyZW5kZXJNYW5pZmVzdCxcbiAgICAgICAgcmVuZGVyT3B0czoge1xuICAgICAgICAgICAgZXhwZXJpbWVudGFsOiB7XG4gICAgICAgICAgICAgICAgY2FjaGVDb21wb25lbnRzOiBCb29sZWFuKG5leHRDb25maWcuZXhwZXJpbWVudGFsLmNhY2hlQ29tcG9uZW50cyksXG4gICAgICAgICAgICAgICAgYXV0aEludGVycnVwdHM6IEJvb2xlYW4obmV4dENvbmZpZy5leHBlcmltZW50YWwuYXV0aEludGVycnVwdHMpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VwcG9ydHNEeW5hbWljUmVzcG9uc2UsXG4gICAgICAgICAgICBpbmNyZW1lbnRhbENhY2hlOiBnZXRSZXF1ZXN0TWV0YShyZXEsICdpbmNyZW1lbnRhbENhY2hlJyksXG4gICAgICAgICAgICBjYWNoZUxpZmVQcm9maWxlczogKF9uZXh0Q29uZmlnX2V4cGVyaW1lbnRhbCA9IG5leHRDb25maWcuZXhwZXJpbWVudGFsKSA9PSBudWxsID8gdm9pZCAwIDogX25leHRDb25maWdfZXhwZXJpbWVudGFsLmNhY2hlTGlmZSxcbiAgICAgICAgICAgIGlzUmV2YWxpZGF0ZSxcbiAgICAgICAgICAgIHdhaXRVbnRpbDogY3R4LndhaXRVbnRpbCxcbiAgICAgICAgICAgIG9uQ2xvc2U6IChjYik9PntcbiAgICAgICAgICAgICAgICByZXMub24oJ2Nsb3NlJywgY2IpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uQWZ0ZXJUYXNrRXJyb3I6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIG9uSW5zdHJ1bWVudGF0aW9uUmVxdWVzdEVycm9yOiAoZXJyb3IsIF9yZXF1ZXN0LCBlcnJvckNvbnRleHQpPT5yb3V0ZU1vZHVsZS5vblJlcXVlc3RFcnJvcihyZXEsIGVycm9yLCBlcnJvckNvbnRleHQsIHJvdXRlclNlcnZlckNvbnRleHQpXG4gICAgICAgIH0sXG4gICAgICAgIHNoYXJlZENvbnRleHQ6IHtcbiAgICAgICAgICAgIGJ1aWxkSWRcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3Qgbm9kZU5leHRSZXEgPSBuZXcgTm9kZU5leHRSZXF1ZXN0KHJlcSk7XG4gICAgY29uc3Qgbm9kZU5leHRSZXMgPSBuZXcgTm9kZU5leHRSZXNwb25zZShyZXMpO1xuICAgIGNvbnN0IG5leHRSZXEgPSBOZXh0UmVxdWVzdEFkYXB0ZXIuZnJvbU5vZGVOZXh0UmVxdWVzdChub2RlTmV4dFJlcSwgc2lnbmFsRnJvbU5vZGVSZXNwb25zZShyZXMpKTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBpbnZva2VSb3V0ZU1vZHVsZSA9IGFzeW5jIChzcGFuKT0+e1xuICAgICAgICAgICAgcmV0dXJuIHJvdXRlTW9kdWxlLmhhbmRsZShuZXh0UmVxLCBjb250ZXh0KS5maW5hbGx5KCgpPT57XG4gICAgICAgICAgICAgICAgaWYgKCFzcGFuKSByZXR1cm47XG4gICAgICAgICAgICAgICAgc3Bhbi5zZXRBdHRyaWJ1dGVzKHtcbiAgICAgICAgICAgICAgICAgICAgJ2h0dHAuc3RhdHVzX2NvZGUnOiByZXMuc3RhdHVzQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgJ25leHQucnNjJzogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCByb290U3BhbkF0dHJpYnV0ZXMgPSB0cmFjZXIuZ2V0Um9vdFNwYW5BdHRyaWJ1dGVzKCk7XG4gICAgICAgICAgICAgICAgLy8gV2Ugd2VyZSB1bmFibGUgdG8gZ2V0IGF0dHJpYnV0ZXMsIHByb2JhYmx5IE9URUwgaXMgbm90IGVuYWJsZWRcbiAgICAgICAgICAgICAgICBpZiAoIXJvb3RTcGFuQXR0cmlidXRlcykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChyb290U3BhbkF0dHJpYnV0ZXMuZ2V0KCduZXh0LnNwYW5fdHlwZScpICE9PSBCYXNlU2VydmVyU3Bhbi5oYW5kbGVSZXF1ZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgVW5leHBlY3RlZCByb290IHNwYW4gdHlwZSAnJHtyb290U3BhbkF0dHJpYnV0ZXMuZ2V0KCduZXh0LnNwYW5fdHlwZScpfScuIFBsZWFzZSByZXBvcnQgdGhpcyBOZXh0LmpzIGlzc3VlIGh0dHBzOi8vZ2l0aHViLmNvbS92ZXJjZWwvbmV4dC5qc2ApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHJvdXRlID0gcm9vdFNwYW5BdHRyaWJ1dGVzLmdldCgnbmV4dC5yb3V0ZScpO1xuICAgICAgICAgICAgICAgIGlmIChyb3V0ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gYCR7bWV0aG9kfSAke3JvdXRlfWA7XG4gICAgICAgICAgICAgICAgICAgIHNwYW4uc2V0QXR0cmlidXRlcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAnbmV4dC5yb3V0ZSc6IHJvdXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2h0dHAucm91dGUnOiByb3V0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICduZXh0LnNwYW5fbmFtZSc6IG5hbWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHNwYW4udXBkYXRlTmFtZShuYW1lKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzcGFuLnVwZGF0ZU5hbWUoYCR7bWV0aG9kfSAke3JlcS51cmx9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGhhbmRsZVJlc3BvbnNlID0gYXN5bmMgKGN1cnJlbnRTcGFuKT0+e1xuICAgICAgICAgICAgdmFyIF9jYWNoZUVudHJ5X3ZhbHVlO1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2VHZW5lcmF0b3IgPSBhc3luYyAoeyBwcmV2aW91c0NhY2hlRW50cnkgfSk9PntcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWdldFJlcXVlc3RNZXRhKHJlcSwgJ21pbmltYWxNb2RlJykgJiYgaXNPbkRlbWFuZFJldmFsaWRhdGUgJiYgcmV2YWxpZGF0ZU9ubHlHZW5lcmF0ZWQgJiYgIXByZXZpb3VzQ2FjaGVFbnRyeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSA0MDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvbi1kZW1hbmQgcmV2YWxpZGF0ZSBhbHdheXMgc2V0cyB0aGlzIGhlYWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnNldEhlYWRlcigneC1uZXh0anMtY2FjaGUnLCAnUkVWQUxJREFURUQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5lbmQoJ1RoaXMgcGFnZSBjb3VsZCBub3QgYmUgZm91bmQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgaW52b2tlUm91dGVNb2R1bGUoY3VycmVudFNwYW4pO1xuICAgICAgICAgICAgICAgICAgICByZXEuZmV0Y2hNZXRyaWNzID0gY29udGV4dC5yZW5kZXJPcHRzLmZldGNoTWV0cmljcztcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBlbmRpbmdXYWl0VW50aWwgPSBjb250ZXh0LnJlbmRlck9wdHMucGVuZGluZ1dhaXRVbnRpbDtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXR0ZW1wdCB1c2luZyBwcm92aWRlZCB3YWl0VW50aWwgaWYgYXZhaWxhYmxlXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGl0J3Mgbm90IHdlIGZhbGxiYWNrIHRvIHNlbmRSZXNwb25zZSdzIGhhbmRsaW5nXG4gICAgICAgICAgICAgICAgICAgIGlmIChwZW5kaW5nV2FpdFVudGlsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3R4LndhaXRVbnRpbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0eC53YWl0VW50aWwocGVuZGluZ1dhaXRVbnRpbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGVuZGluZ1dhaXRVbnRpbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYWNoZVRhZ3MgPSBjb250ZXh0LnJlbmRlck9wdHMuY29sbGVjdGVkVGFncztcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIHJlcXVlc3QgaXMgZm9yIGEgc3RhdGljIHJlc3BvbnNlLCB3ZSBjYW4gY2FjaGUgaXQgc28gbG9uZ1xuICAgICAgICAgICAgICAgICAgICAvLyBhcyBpdCdzIG5vdCBlZGdlLlxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNJc3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGJsb2IgPSBhd2FpdCByZXNwb25zZS5ibG9iKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDb3B5IHRoZSBoZWFkZXJzIGZyb20gdGhlIHJlc3BvbnNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZGVycyA9IHRvTm9kZU91dGdvaW5nSHR0cEhlYWRlcnMocmVzcG9uc2UuaGVhZGVycyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FjaGVUYWdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1tORVhUX0NBQ0hFX1RBR1NfSEVBREVSXSA9IGNhY2hlVGFncztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaGVhZGVyc1snY29udGVudC10eXBlJ10gJiYgYmxvYi50eXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyc1snY29udGVudC10eXBlJ10gPSBibG9iLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXZhbGlkYXRlID0gdHlwZW9mIGNvbnRleHQucmVuZGVyT3B0cy5jb2xsZWN0ZWRSZXZhbGlkYXRlID09PSAndW5kZWZpbmVkJyB8fCBjb250ZXh0LnJlbmRlck9wdHMuY29sbGVjdGVkUmV2YWxpZGF0ZSA+PSBJTkZJTklURV9DQUNIRSA/IGZhbHNlIDogY29udGV4dC5yZW5kZXJPcHRzLmNvbGxlY3RlZFJldmFsaWRhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBleHBpcmUgPSB0eXBlb2YgY29udGV4dC5yZW5kZXJPcHRzLmNvbGxlY3RlZEV4cGlyZSA9PT0gJ3VuZGVmaW5lZCcgfHwgY29udGV4dC5yZW5kZXJPcHRzLmNvbGxlY3RlZEV4cGlyZSA+PSBJTkZJTklURV9DQUNIRSA/IHVuZGVmaW5lZCA6IGNvbnRleHQucmVuZGVyT3B0cy5jb2xsZWN0ZWRFeHBpcmU7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDcmVhdGUgdGhlIGNhY2hlIGVudHJ5IGZvciB0aGUgcmVzcG9uc2UuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjYWNoZUVudHJ5ID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtpbmQ6IENhY2hlZFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXR1czogcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBCdWZmZXIuZnJvbShhd2FpdCBibG9iLmFycmF5QnVmZmVyKCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWNoZUNvbnRyb2w6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV2YWxpZGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwaXJlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWNoZUVudHJ5O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2VuZCByZXNwb25zZSB3aXRob3V0IGNhY2hpbmcgaWYgbm90IElTUlxuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgc2VuZFJlc3BvbnNlKG5vZGVOZXh0UmVxLCBub2RlTmV4dFJlcywgcmVzcG9uc2UsIGNvbnRleHQucmVuZGVyT3B0cy5wZW5kaW5nV2FpdFVudGlsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgYSBiYWNrZ3JvdW5kIHJldmFsaWRhdGUgd2UgbmVlZCB0byByZXBvcnRcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHJlcXVlc3QgZXJyb3IgaGVyZSBhcyBpdCB3b24ndCBiZSBidWJibGVkXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c0NhY2hlRW50cnkgPT0gbnVsbCA/IHZvaWQgMCA6IHByZXZpb3VzQ2FjaGVFbnRyeS5pc1N0YWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCByb3V0ZU1vZHVsZS5vblJlcXVlc3RFcnJvcihyZXEsIGVyciwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdXRlcktpbmQ6ICdBcHAgUm91dGVyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3V0ZVBhdGg6IHNyY1BhZ2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91dGVUeXBlOiAncm91dGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldmFsaWRhdGVSZWFzb246IGdldFJldmFsaWRhdGVSZWFzb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1JldmFsaWRhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzT25EZW1hbmRSZXZhbGlkYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHJvdXRlclNlcnZlckNvbnRleHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgY2FjaGVFbnRyeSA9IGF3YWl0IHJvdXRlTW9kdWxlLmhhbmRsZVJlc3BvbnNlKHtcbiAgICAgICAgICAgICAgICByZXEsXG4gICAgICAgICAgICAgICAgbmV4dENvbmZpZyxcbiAgICAgICAgICAgICAgICBjYWNoZUtleSxcbiAgICAgICAgICAgICAgICByb3V0ZUtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgICAgICAgICAgaXNGYWxsYmFjazogZmFsc2UsXG4gICAgICAgICAgICAgICAgcHJlcmVuZGVyTWFuaWZlc3QsXG4gICAgICAgICAgICAgICAgaXNSb3V0ZVBQUkVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGlzT25EZW1hbmRSZXZhbGlkYXRlLFxuICAgICAgICAgICAgICAgIHJldmFsaWRhdGVPbmx5R2VuZXJhdGVkLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNlR2VuZXJhdG9yLFxuICAgICAgICAgICAgICAgIHdhaXRVbnRpbDogY3R4LndhaXRVbnRpbFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyB3ZSBkb24ndCBjcmVhdGUgYSBjYWNoZUVudHJ5IGZvciBJU1JcbiAgICAgICAgICAgIGlmICghaXNJc3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgoY2FjaGVFbnRyeSA9PSBudWxsID8gdm9pZCAwIDogKF9jYWNoZUVudHJ5X3ZhbHVlID0gY2FjaGVFbnRyeS52YWx1ZSkgPT0gbnVsbCA/IHZvaWQgMCA6IF9jYWNoZUVudHJ5X3ZhbHVlLmtpbmQpICE9PSBDYWNoZWRSb3V0ZUtpbmQuQVBQX1JPVVRFKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9jYWNoZUVudHJ5X3ZhbHVlMTtcbiAgICAgICAgICAgICAgICB0aHJvdyBPYmplY3QuZGVmaW5lUHJvcGVydHkobmV3IEVycm9yKGBJbnZhcmlhbnQ6IGFwcC1yb3V0ZSByZWNlaXZlZCBpbnZhbGlkIGNhY2hlIGVudHJ5ICR7Y2FjaGVFbnRyeSA9PSBudWxsID8gdm9pZCAwIDogKF9jYWNoZUVudHJ5X3ZhbHVlMSA9IGNhY2hlRW50cnkudmFsdWUpID09IG51bGwgPyB2b2lkIDAgOiBfY2FjaGVFbnRyeV92YWx1ZTEua2luZH1gKSwgXCJfX05FWFRfRVJST1JfQ09ERVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcIkU3MDFcIixcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFnZXRSZXF1ZXN0TWV0YShyZXEsICdtaW5pbWFsTW9kZScpKSB7XG4gICAgICAgICAgICAgICAgcmVzLnNldEhlYWRlcigneC1uZXh0anMtY2FjaGUnLCBpc09uRGVtYW5kUmV2YWxpZGF0ZSA/ICdSRVZBTElEQVRFRCcgOiBjYWNoZUVudHJ5LmlzTWlzcyA/ICdNSVNTJyA6IGNhY2hlRW50cnkuaXNTdGFsZSA/ICdTVEFMRScgOiAnSElUJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEcmFmdCBtb2RlIHNob3VsZCBuZXZlciBiZSBjYWNoZWRcbiAgICAgICAgICAgIGlmIChpc0RyYWZ0TW9kZSkge1xuICAgICAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ0NhY2hlLUNvbnRyb2wnLCAncHJpdmF0ZSwgbm8tY2FjaGUsIG5vLXN0b3JlLCBtYXgtYWdlPTAsIG11c3QtcmV2YWxpZGF0ZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgaGVhZGVycyA9IGZyb21Ob2RlT3V0Z29pbmdIdHRwSGVhZGVycyhjYWNoZUVudHJ5LnZhbHVlLmhlYWRlcnMpO1xuICAgICAgICAgICAgaWYgKCEoZ2V0UmVxdWVzdE1ldGEocmVxLCAnbWluaW1hbE1vZGUnKSAmJiBpc0lzcikpIHtcbiAgICAgICAgICAgICAgICBoZWFkZXJzLmRlbGV0ZShORVhUX0NBQ0hFX1RBR1NfSEVBREVSKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIElmIGNhY2hlIGNvbnRyb2wgaXMgYWxyZWFkeSBzZXQgb24gdGhlIHJlc3BvbnNlIHdlIGRvbid0XG4gICAgICAgICAgICAvLyBvdmVycmlkZSBpdCB0byBhbGxvdyB1c2VycyB0byBjdXN0b21pemUgaXQgdmlhIG5leHQuY29uZmlnXG4gICAgICAgICAgICBpZiAoY2FjaGVFbnRyeS5jYWNoZUNvbnRyb2wgJiYgIXJlcy5nZXRIZWFkZXIoJ0NhY2hlLUNvbnRyb2wnKSAmJiAhaGVhZGVycy5nZXQoJ0NhY2hlLUNvbnRyb2wnKSkge1xuICAgICAgICAgICAgICAgIGhlYWRlcnMuc2V0KCdDYWNoZS1Db250cm9sJywgZ2V0Q2FjaGVDb250cm9sSGVhZGVyKGNhY2hlRW50cnkuY2FjaGVDb250cm9sKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCBzZW5kUmVzcG9uc2Uobm9kZU5leHRSZXEsIG5vZGVOZXh0UmVzLCBuZXcgUmVzcG9uc2UoY2FjaGVFbnRyeS52YWx1ZS5ib2R5LCB7XG4gICAgICAgICAgICAgICAgaGVhZGVycyxcbiAgICAgICAgICAgICAgICBzdGF0dXM6IGNhY2hlRW50cnkudmFsdWUuc3RhdHVzIHx8IDIwMFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIC8vIFRPRE86IGFjdGl2ZVNwYW4gY29kZSBwYXRoIGlzIGZvciB3aGVuIHdyYXBwZWQgYnlcbiAgICAgICAgLy8gbmV4dC1zZXJ2ZXIgY2FuIGJlIHJlbW92ZWQgd2hlbiB0aGlzIGlzIG5vIGxvbmdlciB1c2VkXG4gICAgICAgIGlmIChhY3RpdmVTcGFuKSB7XG4gICAgICAgICAgICBhd2FpdCBoYW5kbGVSZXNwb25zZShhY3RpdmVTcGFuKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGF3YWl0IHRyYWNlci53aXRoUHJvcGFnYXRlZENvbnRleHQocmVxLmhlYWRlcnMsICgpPT50cmFjZXIudHJhY2UoQmFzZVNlcnZlclNwYW4uaGFuZGxlUmVxdWVzdCwge1xuICAgICAgICAgICAgICAgICAgICBzcGFuTmFtZTogYCR7bWV0aG9kfSAke3JlcS51cmx9YCxcbiAgICAgICAgICAgICAgICAgICAga2luZDogU3BhbktpbmQuU0VSVkVSLFxuICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnaHR0cC5tZXRob2QnOiBtZXRob2QsXG4gICAgICAgICAgICAgICAgICAgICAgICAnaHR0cC50YXJnZXQnOiByZXEudXJsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBoYW5kbGVSZXNwb25zZSkpO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGlmICghKGVyciBpbnN0YW5jZW9mIE5vRmFsbGJhY2tFcnJvcikpIHtcbiAgICAgICAgICAgIGF3YWl0IHJvdXRlTW9kdWxlLm9uUmVxdWVzdEVycm9yKHJlcSwgZXJyLCB7XG4gICAgICAgICAgICAgICAgcm91dGVyS2luZDogJ0FwcCBSb3V0ZXInLFxuICAgICAgICAgICAgICAgIHJvdXRlUGF0aDogbm9ybWFsaXplZFNyY1BhZ2UsXG4gICAgICAgICAgICAgICAgcm91dGVUeXBlOiAncm91dGUnLFxuICAgICAgICAgICAgICAgIHJldmFsaWRhdGVSZWFzb246IGdldFJldmFsaWRhdGVSZWFzb24oe1xuICAgICAgICAgICAgICAgICAgICBpc1JldmFsaWRhdGUsXG4gICAgICAgICAgICAgICAgICAgIGlzT25EZW1hbmRSZXZhbGlkYXRlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJldGhyb3cgc28gdGhhdCB3ZSBjYW4gaGFuZGxlIHNlcnZpbmcgZXJyb3IgcGFnZVxuICAgICAgICAvLyBJZiB0aGlzIGlzIGR1cmluZyBzdGF0aWMgZ2VuZXJhdGlvbiwgdGhyb3cgdGhlIGVycm9yIGFnYWluLlxuICAgICAgICBpZiAoaXNJc3IpIHRocm93IGVycjtcbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBzZW5kIGEgNTAwIHJlc3BvbnNlLlxuICAgICAgICBhd2FpdCBzZW5kUmVzcG9uc2Uobm9kZU5leHRSZXEsIG5vZGVOZXh0UmVzLCBuZXcgUmVzcG9uc2UobnVsbCwge1xuICAgICAgICAgICAgc3RhdHVzOiA1MDBcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXBcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=%2FUsers%2Fzhangs%2Fiitg251%2Fbranchchat-visualizer%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fzhangs%2Fiitg251%2Fbranchchat-visualizer&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/server/app-render/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "./work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "?32c4":
/*!****************************!*\
  !*** bufferutil (ignored) ***!
  \****************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "?66e9":
/*!********************************!*\
  !*** utf-8-validate (ignored) ***!
  \********************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongodb");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "next/dist/shared/lib/no-fallback-error.external":
/*!******************************************************************!*\
  !*** external "next/dist/shared/lib/no-fallback-error.external" ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/no-fallback-error.external");

/***/ }),

/***/ "next/dist/shared/lib/router/utils/app-paths":
/*!**************************************************************!*\
  !*** external "next/dist/shared/lib/router/utils/app-paths" ***!
  \**************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/app-paths");

/***/ }),

/***/ "node:buffer":
/*!******************************!*\
  !*** external "node:buffer" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ "node:http":
/*!****************************!*\
  !*** external "node:http" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:http");

/***/ }),

/***/ "node:https":
/*!*****************************!*\
  !*** external "node:https" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:https");

/***/ }),

/***/ "node:net":
/*!***************************!*\
  !*** external "node:net" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:net");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ "node:process":
/*!*******************************!*\
  !*** external "node:process" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:process");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ "node:stream/promises":
/*!***************************************!*\
  !*** external "node:stream/promises" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream/promises");

/***/ }),

/***/ "node:stream/web":
/*!**********************************!*\
  !*** external "node:stream/web" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream/web");

/***/ }),

/***/ "node:url":
/*!***************************!*\
  !*** external "node:url" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:url");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),

/***/ "node:zlib":
/*!****************************!*\
  !*** external "node:zlib" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:zlib");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "process":
/*!**************************!*\
  !*** external "process" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("process");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "worker_threads":
/*!*********************************!*\
  !*** external "worker_threads" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("worker_threads");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/google-auth-library","vendor-chunks/ws","vendor-chunks/gaxios","vendor-chunks/jws","vendor-chunks/retry","vendor-chunks/json-bigint","vendor-chunks/google-logging-utils","vendor-chunks/ecdsa-sig-formatter","vendor-chunks/@google","vendor-chunks/safe-buffer","vendor-chunks/p-retry","vendor-chunks/jwa","vendor-chunks/extend","vendor-chunks/buffer-equal-constant-time","vendor-chunks/bignumber.js","vendor-chunks/base64-js"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fchat%2Froute&page=%2Fapi%2Fchat%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fchat%2Froute.ts&appDir=%2FUsers%2Fzhangs%2Fiitg251%2Fbranchchat-visualizer%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fzhangs%2Fiitg251%2Fbranchchat-visualizer&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D&isGlobalNotFoundEnabled=!")));
module.exports = __webpack_exports__;

})();