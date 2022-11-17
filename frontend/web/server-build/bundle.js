/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./packages/pages/links/StackOverflow.svg":
/*!************************************************!*\
  !*** ./packages/pages/links/StackOverflow.svg ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nvar _path, _path2;\n\nfunction _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\nfunction SvgStackOverflow(props) {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"svg\", _extends({\n    \"aria-hidden\": \"true\",\n    className: \"StackOverflow_svg__svg-icon StackOverflow_svg__iconLogoGlyphMd StackOverflow_svg__native\",\n    width: 32,\n    height: 32,\n    viewBox: \"0 0 40 40\"\n  }, props), _path || (_path = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"path\", {\n    d: \"M26 33v-9h4v13H0V24h4v9h22z\"\n  })), _path2 || (_path2 = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"path\", {\n    d: \"M21.5 0l-2.7 2 9.9 13.3 2.7-2L21.5 0zM26 18.4L13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5zM9.1 15.2l15 7 1.4-3-15-7-1.4 3zm14 10.79l.68-2.95-16.1-3.35L7 23l16.1 2.99zM23 30H7v-3h16v3z\"\n  })));\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SvgStackOverflow);\n\n//# sourceURL=webpack://codyduongweb/./packages/pages/links/StackOverflow.svg?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
eval("\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\n\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot || '').concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack://codyduongweb/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./packages/components/3D/Construction3D.tsx":
/*!***************************************************!*\
  !*** ./packages/components/3D/Construction3D.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"three\");\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @react-three/fiber */ \"@react-three/fiber\");\n/* harmony import */ var _react_three_fiber__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_react_three_fiber__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _theatre_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @theatre/core */ \"@theatre/core\");\n/* harmony import */ var _theatre_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_theatre_core__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _theatre_r3f__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @theatre/r3f */ \"@theatre/r3f\");\n/* harmony import */ var _theatre_r3f__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_theatre_r3f__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _react_three_drei__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @react-three/drei */ \"@react-three/drei\");\n/* harmony import */ var _react_three_drei__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_react_three_drei__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var three_examples_jsm_loaders_MTLLoader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! three/examples/jsm/loaders/MTLLoader */ \"three/examples/jsm/loaders/MTLLoader\");\n/* harmony import */ var three_examples_jsm_loaders_MTLLoader__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(three_examples_jsm_loaders_MTLLoader__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var three_examples_jsm_loaders_OBJLoader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! three/examples/jsm/loaders/OBJLoader */ \"three/examples/jsm/loaders/OBJLoader\");\n/* harmony import */ var three_examples_jsm_loaders_OBJLoader__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(three_examples_jsm_loaders_OBJLoader__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _react_three_cannon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @react-three/cannon */ \"@react-three/cannon\");\n/* harmony import */ var _react_three_cannon__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_react_three_cannon__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var packages_components_3D_util__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! packages/components/3D/util */ \"./packages/components/3D/util.tsx\");\n/* harmony import */ var packages_components_Typography__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! packages/components/Typography */ \"./packages/components/Typography/index.tsx\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__);\nvar _jsxFileName = \"/home/cody_duong/codyduongweb/frontend/web/packages/components/3D/Construction3D.tsx\";\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\n\n\n\n\n\n // if (process.env.NODE_ENV === 'development') {\n//   studio.initialize();\n//   studio.extend(extension);\n// }\n\n\n\n\nconst demoSheet = (0,_theatre_core__WEBPACK_IMPORTED_MODULE_3__.getProject)('codyduongweb').sheet('underConstruction');\n\nconst Plane = props => {\n  const [rotation, position] = [[-1.57079632679, 0, 0], [0, -0.5, 0]];\n  const [ref] = (0,_react_three_cannon__WEBPACK_IMPORTED_MODULE_8__.usePlane)(() => ({\n    rotation,\n    position,\n    width: 100,\n    height: 100,\n    type: 'Static'\n  }));\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_theatre_r3f__WEBPACK_IMPORTED_MODULE_4__.editable.mesh, {\n    // @ts-expect-error: ?\n    ref: ref,\n    theatreKey: \"floor\",\n    position: [0, -0.5, 0],\n    rotation: [-1.57079632679, 0, 0],\n    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(\"planeGeometry\", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(\"meshPhongMaterial\", {\n      transparent: true,\n      color: \"white\",\n      opacity: 0\n    })]\n  });\n};\n\nconst Cone = _ref => {\n  let {\n    cone,\n    coneCollisions,\n    primitiveProps\n  } = _ref;\n  const [ref] = (0,_react_three_cannon__WEBPACK_IMPORTED_MODULE_8__.useCompoundBody)(() => _objectSpread(_objectSpread({}, {\n    shapes: [{\n      type: 'ConvexPolyhedron',\n      args: coneCollisions[0]\n    }, {\n      type: 'ConvexPolyhedron',\n      args: coneCollisions[1]\n    }],\n    mass: 5,\n    position: [0, 8, 0]\n  }), primitiveProps));\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(\"primitive\", {\n    ref: ref,\n    editableType: \"mesh\",\n    object: cone,\n    scale: [5, 5, 5],\n    castShadow: true,\n    receieveShadow: true\n  });\n};\n\nconst CanvasSection = (styled_components__WEBPACK_IMPORTED_MODULE_11___default().section)`\n  position: absolute;\n  width: 100%;\n  top: ${props => props.theme.spacing.rem[300]};\n  bottom: 0;\n`;\nconst UnderConstructionSection = (styled_components__WEBPACK_IMPORTED_MODULE_11___default().section)`\n  position: absolute;\n  bottom: 0;\n  width: 100vw;\n  height: 40vh;\n  display: flex;\n  flex-flow: column nowrap;\n  align-items: center;\n  box-sizing: border-box;\n  padding: ${props => props.theme.spacing.rem[300]};\n`;\n\nconst Construction3D = props => {\n  const coneMaterial = (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_2__.useLoader)(three_examples_jsm_loaders_MTLLoader__WEBPACK_IMPORTED_MODULE_6__.MTLLoader, '3d/cone/materials.mtl');\n  const cone = (0,_react_three_fiber__WEBPACK_IMPORTED_MODULE_2__.useLoader)(three_examples_jsm_loaders_OBJLoader__WEBPACK_IMPORTED_MODULE_7__.OBJLoader, '3d/cone/model.obj', loader => {\n    coneMaterial.preload(); // @ts-expect-error: todo\n\n    loader.setMaterials(coneMaterial);\n  });\n  const coneCollisions = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => [// https://stackoverflow.com/a/21630178/17954209\n  (0,packages_components_3D_util__WEBPACK_IMPORTED_MODULE_9__.toConvexProps)(new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(0.1, 0.33, 1.2, 12, 1), [0, 0.3, 0]), (0,packages_components_3D_util__WEBPACK_IMPORTED_MODULE_9__.toConvexProps)(new three__WEBPACK_IMPORTED_MODULE_0__.CylinderGeometry(0.53, 0.53, 0.1, 12, 1), [0, -0.3, 0])], []);\n  const cone2 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => cone.clone(), []);\n  const cone3 = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => cone.clone(), []);\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.Fragment, {\n    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(CanvasSection, {\n      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_react_three_fiber__WEBPACK_IMPORTED_MODULE_2__.Canvas, {\n        camera: {\n          position: [-5, 2, -5]\n        },\n        gl: {\n          preserveDrawingBuffer: true\n        },\n        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_theatre_r3f__WEBPACK_IMPORTED_MODULE_4__.SheetProvider, {\n          sheet: demoSheet,\n          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(\"ambientLight\", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_theatre_r3f__WEBPACK_IMPORTED_MODULE_4__.editable.pointLight, {\n            theatreKey: \"pointLight1\",\n            intensity: 10,\n            position: [-1, 10, 2.5]\n          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_react_three_drei__WEBPACK_IMPORTED_MODULE_5__.OrbitControls, {\n            enablePan: false,\n            enableZoom: false,\n            enabled: false // minPolarAngle={Math.PI / 2.2}\n            // maxPolarAngle={Math.PI / 2.2}\n\n          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_react_three_cannon__WEBPACK_IMPORTED_MODULE_8__.Physics, {\n            size: 10,\n            allowSleep: true,\n            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(Plane, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(Cone, {\n              cone: cone,\n              coneCollisions: coneCollisions,\n              primitiveProps: {\n                rotation: [0.36, 0.12, 0.24]\n              }\n            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(Cone, {\n              cone: cone2,\n              coneCollisions: coneCollisions,\n              primitiveProps: {\n                position: [0.15, 7, 1],\n                rotation: [0.9, 3, 0.75]\n              }\n            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(Cone, {\n              cone: cone3,\n              coneCollisions: coneCollisions,\n              primitiveProps: {\n                position: [1, 7, 0],\n                rotation: [0.4, 0.7, 1.8]\n              }\n            })]\n          })]\n        })\n      })\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(UnderConstructionSection, {\n      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(packages_components_Typography__WEBPACK_IMPORTED_MODULE_10__.Typography.Heading.H2, {\n        children: \"This page is under construction\"\n      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(packages_components_Typography__WEBPACK_IMPORTED_MODULE_10__.Typography.Paragraph.P2, {\n        children: \"Please come back later\"\n      })]\n    })]\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Construction3D);\n\n//# sourceURL=webpack://codyduongweb/./packages/components/3D/Construction3D.tsx?");

/***/ }),

/***/ "./packages/components/3D/util.tsx":
/*!*****************************************!*\
  !*** ./packages/components/3D/util.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DebugDev\": () => (/* binding */ DebugDev),\n/* harmony export */   \"toConvexProps\": () => (/* binding */ toConvexProps)\n/* harmony export */ });\n/* harmony import */ var three_stdlib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three-stdlib */ \"three-stdlib\");\n/* harmony import */ var three_stdlib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three_stdlib__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _react_three_cannon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @react-three/cannon */ \"@react-three/cannon\");\n/* harmony import */ var _react_three_cannon__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_react_three_cannon__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);\nvar _jsxFileName = \"/home/cody_duong/codyduongweb/frontend/web/packages/components/3D/util.tsx\";\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n// https://github.com/pmndrs/react-three-fiber/discussions/949\n\n\n\n\nfunction toConvexProps(bufferGeometry) {\n  let offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [0, 0, 0];\n  const geo = new three_stdlib__WEBPACK_IMPORTED_MODULE_0__.Geometry().fromBufferGeometry(bufferGeometry); // Merge duplicate vertices resulting from glTF export.\n  // Cannon assumes contiguous, closed meshes to work\n\n  geo.mergeVertices();\n  return [geo.vertices.map(v => [v.x + offset[0], v.y + offset[1], v.z + offset[2]]), geo.faces.map(f => [f.a, f.b, f.c]), []];\n}\nconst DebugDev = props => {\n  return  true ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_react_three_cannon__WEBPACK_IMPORTED_MODULE_1__.Debug, _objectSpread({}, props)) : /*#__PURE__*/0;\n};\n\n//# sourceURL=webpack://codyduongweb/./packages/components/3D/util.tsx?");

/***/ }),

/***/ "./packages/components/A/A.tsx":
/*!*************************************!*\
  !*** ./packages/components/A/A.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"A\": () => (/* binding */ A)\n/* harmony export */ });\n/* harmony import */ var packages_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! packages/style */ \"./packages/style/index.ts\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst A = (styled_components__WEBPACK_IMPORTED_MODULE_1___default().a)`\n  text-decoration: none;\n  user-select: none;\n  :hover {\n    cursor: pointer;\n  }\n  ${packages_style__WEBPACK_IMPORTED_MODULE_0__.commoncss.focus}\n`;\n\n//# sourceURL=webpack://codyduongweb/./packages/components/A/A.tsx?");

/***/ }),

/***/ "./packages/components/A/Link.tsx":
/*!****************************************!*\
  !*** ./packages/components/A/Link.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Link\": () => (/* binding */ Link)\n/* harmony export */ });\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var packages_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! packages/style */ \"./packages/style/index.ts\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst Link = styled_components__WEBPACK_IMPORTED_MODULE_2___default()(react_router_dom__WEBPACK_IMPORTED_MODULE_0__.Link)`\n  text-decoration: none;\n  user-select: none;\n  :hover {\n    cursor: pointer;\n  }\n  ${packages_style__WEBPACK_IMPORTED_MODULE_1__.commoncss.focus}\n`;\n\n//# sourceURL=webpack://codyduongweb/./packages/components/A/Link.tsx?");

/***/ }),

/***/ "./packages/components/A/index.tsx":
/*!*****************************************!*\
  !*** ./packages/components/A/index.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Link__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Link */ \"./packages/components/A/Link.tsx\");\n/* harmony import */ var _A__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./A */ \"./packages/components/A/A.tsx\");\n\n\nconst A = Object.assign(_A__WEBPACK_IMPORTED_MODULE_1__.A, {\n  Link: _Link__WEBPACK_IMPORTED_MODULE_0__.Link\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (A);\n\n//# sourceURL=webpack://codyduongweb/./packages/components/A/index.tsx?");

/***/ }),

/***/ "./packages/components/Button/Button.tsx":
/*!***********************************************!*\
  !*** ./packages/components/Button/Button.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Button\": () => (/* binding */ Button)\n/* harmony export */ });\n/* harmony import */ var packages_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! packages/style */ \"./packages/style/index.ts\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst Button = (styled_components__WEBPACK_IMPORTED_MODULE_1___default().button)`\n  ${packages_style__WEBPACK_IMPORTED_MODULE_0__.commoncss.focus}\n`;\n\n//# sourceURL=webpack://codyduongweb/./packages/components/Button/Button.tsx?");

/***/ }),

/***/ "./packages/components/Button/index.tsx":
/*!**********************************************!*\
  !*** ./packages/components/Button/index.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* reexport safe */ _Button__WEBPACK_IMPORTED_MODULE_0__.Button)\n/* harmony export */ });\n/* harmony import */ var _Button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Button */ \"./packages/components/Button/Button.tsx\");\n\n\n//# sourceURL=webpack://codyduongweb/./packages/components/Button/index.tsx?");

/***/ }),

/***/ "./packages/components/Navbar/Navbar.tsx":
/*!***********************************************!*\
  !*** ./packages/components/Navbar/Navbar.tsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var packages_components_Typography__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! packages/components/Typography */ \"./packages/components/Typography/index.tsx\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _mui_icons_material_Menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mui/icons-material/Menu */ \"@mui/icons-material/Menu\");\n/* harmony import */ var _mui_icons_material_Menu__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_Menu__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _mui_icons_material_MenuOpen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/icons-material/MenuOpen */ \"@mui/icons-material/MenuOpen\");\n/* harmony import */ var _mui_icons_material_MenuOpen__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_MenuOpen__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var packages_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! packages/components/Button */ \"./packages/components/Button/index.tsx\");\n/* harmony import */ var packages_components_A__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! packages/components/A */ \"./packages/components/A/index.tsx\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var packages_components_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! packages/components/utils */ \"./packages/components/utils/index.ts\");\n/* harmony import */ var _NavbarMenu__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./NavbarMenu */ \"./packages/components/Navbar/NavbarMenu.tsx\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__);\nvar _jsxFileName = \"/home/cody_duong/codyduongweb/frontend/web/packages/components/Navbar/Navbar.tsx\";\n\n\n\n\n\n\n\n\n\n\n\n\n\nconst TrapFocus = (styled_components__WEBPACK_IMPORTED_MODULE_1___default().div)`\n  position: absolute;\n`;\nconst Header = (styled_components__WEBPACK_IMPORTED_MODULE_1___default().header)`\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  padding: ${props => `${props.theme.spacing.px(75)} ${props.theme.spacing.px[150]}`};\n  position: sticky;\n  width: 100%;\n  height: ${props => props.theme.spacing.rem[300]};\n  background-color: ${props => props.theme.color.surface[400]};\n  box-sizing: border-box;\n  z-index: 1000;\n\n  &.navbar-open {\n    background-color: ${props => props.theme.color.surface[500]};\n  }\n`;\nconst Name = styled_components__WEBPACK_IMPORTED_MODULE_1___default()(packages_components_A__WEBPACK_IMPORTED_MODULE_5__[\"default\"].Link)`\n  ${packages_components_Typography__WEBPACK_IMPORTED_MODULE_0__.Typography.Paragraph.P2.bold.css}\n  color: ${props => props.theme.color.text[100]};\n  text-align: center;\n  padding: 0.25em 0.5em 0em;\n  border-radius: ${props => props.theme.spacing.rem[25]};\n`;\nconst HamburgerButton = styled_components__WEBPACK_IMPORTED_MODULE_1___default()(packages_components_Button__WEBPACK_IMPORTED_MODULE_4__[\"default\"])`\n  position: relative;\n  display: flex;\n  height: ${props => props.theme.spacing.rem[200]};\n  padding: ${props => `${props.theme.spacing.rem[12.5]} ${props.theme.spacing.rem[50]}`};\n  border-radius: ${props => props.theme.spacing.rem[25]};\n  flex-direction: row;\n  align-items: center;\n  gap: ${_ref => {\n  let {\n    theme\n  } = _ref;\n  return theme.spacing.rem[50];\n}};\n  label {\n    ${packages_components_Typography__WEBPACK_IMPORTED_MODULE_0__.Typography.Paragraph.P3.css}\n    color: ${_ref2 => {\n  let {\n    theme\n  } = _ref2;\n  return theme.color.text[100];\n}};\n    margin: 0px;\n    margin-top: 0.25em;\n    cursor: pointer;\n    pointer-events: none;\n    user-select: none;\n  }\n  padding-right: calc(24px + ${_ref3 => {\n  let {\n    theme\n  } = _ref3;\n  return theme.spacing.rem[100];\n}});\n  && > svg {\n    position: absolute;\n    right: 0;\n    fill: ${_ref4 => {\n  let {\n    theme\n  } = _ref4;\n  return theme.color.surface[100];\n}};\n    transition: all 225ms ease-in-out 0s;\n    opacity: 1;\n    transform-origin: center left;\n    margin-right: 0.5rem;\n\n    &.hamburger-icon-open {\n      @keyframes svg-translate {\n        0% {\n          opacity: 0;\n          transform: scaleX(1.125);\n        }\n        100% {\n          opacity: 1;\n          transform: scaleX(1);\n        }\n      }\n      @keyframes svg-translate-reverse {\n        0% {\n          opacity: 1;\n          transform: scaleX(1);\n        }\n        100% {\n          opacity: 0;\n          transform: scaleX(1.125);\n        }\n      }\n      &.hamburger-icon-opened {\n        animation: svg-translate 225ms ease-in-out forwards;\n      }\n      &.hamburger-icon-closed {\n        animation: svg-translate-reverse 225ms ease-in-out forwards;\n      }\n    }\n    &.hamburger-icon-close {\n      @keyframes svg-scale {\n        0% {\n          opacity: 1;\n          transform: scaleX(1);\n        }\n        100% {\n          opacity: 0;\n          transform: scaleX(0.625);\n        }\n      }\n      @keyframes svg-scale-reverse {\n        0% {\n          opacity: 0;\n          transform: scaleX(0.625);\n        }\n        100% {\n          opacity: 1;\n          transform: scaleX(1);\n        }\n      }\n      &.hamburger-icon-opened {\n        animation: svg-scale 225ms ease-in-out forwards;\n      }\n      &.hamburger-icon-closed {\n        animation: svg-scale-reverse 225ms ease-in-out forwards;\n      }\n    }\n    &.hamburger-icon-display-hidden {\n      display: none;\n    }\n    &.hamburger-prevent-animate {\n      animation-duration: 0s !important;\n    }\n  }\n`;\n\nconst Navbar = () => {\n  const [open, setOpen] = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(false);\n  const [animationState, setAnimationState] = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(1);\n  const [initial, setInitial] = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(true);\n  const refHeader = (0,react__WEBPACK_IMPORTED_MODULE_6__.useRef)(null);\n  const navClassname = classnames__WEBPACK_IMPORTED_MODULE_7___default()('navbar-root', {\n    ['navbar-open']: open,\n    ['navbar-closed']: !open\n  });\n\n  const hamburgerClassname = s => {\n    return classnames__WEBPACK_IMPORTED_MODULE_7___default()(`hamburger-icon-${s}`, {\n      ['hamburger-icon-opened']: open,\n      ['hamburger-icon-closed']: !open,\n      ['hamburger-prevent-animate']: initial\n    });\n  };\n\n  let mounted = false;\n  (0,react__WEBPACK_IMPORTED_MODULE_6__.useEffect)(() => {\n    mounted = true;\n    setTimeout(() => {\n      mounted && setInitial(false);\n    }, 225);\n\n    () => {\n      mounted = false;\n    };\n  }, []);\n  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_10__.useLocation)();\n  const currentlyAt = ['home', 'works', 'articles', 'contact', 'links'].includes(location.pathname.slice(1)) ? location.pathname.slice(1) : 'home';\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(Header, {\n    className: navClassname,\n    ref: refHeader,\n    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(TrapFocus, {\n      tabIndex: open ? 0 : -1,\n      onFocus: () => {\n        open && refHeader.current && packages_components_utils__WEBPACK_IMPORTED_MODULE_8__[\"default\"].focusLastDescendant(refHeader.current);\n      }\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(Name, {\n      to: \"/\",\n      onClick: () => {\n        setOpen(false);\n      },\n      children: \"codyduong\"\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(HamburgerButton, {\n      id: \"nav-hamburger-button\",\n      onClick: () => {\n        setOpen(!open);\n      },\n      \"aria-label\": \"Navigation Menu\",\n      \"aria-haspopup\": true,\n      \"aria-controls\": \"nav-hamburger-list\",\n      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(\"label\", {\n        htmlFor: \"nav-hamburger\",\n        children: currentlyAt\n      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)((_mui_icons_material_Menu__WEBPACK_IMPORTED_MODULE_2___default()), {\n        className: hamburgerClassname('close'),\n        \"aria-labelledby\": \"nav-hamburger-button\",\n        style: {\n          display: animationState == 0 && open ? 'none' : undefined\n        },\n        onAnimationEnd: () => {\n          animationState === 1 ? setAnimationState(0) : setAnimationState(1);\n        }\n      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)((_mui_icons_material_MenuOpen__WEBPACK_IMPORTED_MODULE_3___default()), {\n        className: hamburgerClassname('open'),\n        \"aria-labelledby\": \"nav-hamburger-button\",\n        onAnimationEnd: () => {\n          animationState === 1 ? setAnimationState(0) : setAnimationState(1);\n        },\n        style: {\n          display: animationState == 1 && !open ? 'none' : undefined\n        }\n      })]\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_NavbarMenu__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n      open: open,\n      setOpen: setOpen\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(TrapFocus, {\n      tabIndex: open ? 0 : -1,\n      onFocus: () => {\n        open && refHeader.current && packages_components_utils__WEBPACK_IMPORTED_MODULE_8__[\"default\"].focusFirstDescendant(refHeader.current);\n      }\n    })]\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navbar);\n\n//# sourceURL=webpack://codyduongweb/./packages/components/Navbar/Navbar.tsx?");

/***/ }),

/***/ "./packages/components/Navbar/NavbarMenu.tsx":
/*!***************************************************!*\
  !*** ./packages/components/Navbar/NavbarMenu.tsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ \"classnames\");\n/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var packages_components_Typography__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! packages/components/Typography */ \"./packages/components/Typography/index.tsx\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var packages_components_A__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! packages/components/A */ \"./packages/components/A/index.tsx\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);\nvar _jsxFileName = \"/home/cody_duong/codyduongweb/frontend/web/packages/components/Navbar/NavbarMenu.tsx\";\nconst _excluded = [\"to\", \"children\", \"className\", \"setOpen\"];\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }\n\nfunction _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }\n\n\n\n\n\n\n\n\n\nconst NavbarMenuComponent = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().menu)`\n  display: flex;\n  position: absolute;\n  width: 100%;\n  height: 0vh;\n  overflow: hidden;\n  z-index: 1000;\n  top: ${props => props.theme.spacing.rem[300]};\n  left: 0;\n  padding: 0;\n  margin: 0;\n\n  background-color: inherit;\n  transition: height 225ms ease-in-out 0s;\n\n  &.nav-hamburger-list-open {\n    height: calc(100vh - ${props => props.theme.spacing.rem[300]});\n  }\n`;\nconst PaddedContainer = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`\n  width: 100%;\n  height: 100%;\n  padding: ${props => `${props.theme.spacing.rem[100]} ${props.theme.spacing.rem[200]}`};\n  /* display: flex;\n  flex-flow: column nowrap;\n  gap: 8px; */\n`;\nconst StyledLink = styled_components__WEBPACK_IMPORTED_MODULE_3___default()(packages_components_A__WEBPACK_IMPORTED_MODULE_4__[\"default\"].Link)`\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: center;\n  gap: 8px;\n\n  /* width: 382px; */\n  /* height: 32px; */\n\n  /* inferna-color-surface-500 */\n  /* background: ${props => props.theme.color.surface[500]}; */\n\n  /* Inside auto layout */\n  flex: none;\n  order: 0;\n  align-self: stretch;\n  flex-grow: 0;\n\n  padding-top: 16px;\n  cursor: pointer;\n  ${packages_components_Typography__WEBPACK_IMPORTED_MODULE_1__.Paragraph.P2.bold.css}\n  color: ${props => props.theme.color.text[300]};\n\n  &:hover {\n    color: ${props => props.theme.color.base[100]};\n  }\n\n  &.navbar-link-open {\n    color: ${props => props.theme.color.text[100]};\n    &:hover {\n      color: ${props => props.theme.color.base[300]};\n    }\n  }\n`;\nconst LinkDivider = (styled_components__WEBPACK_IMPORTED_MODULE_3___default().div)`\n  width: 100%;\n  height: 1px;\n\n  /* inferna-color-text-400 */\n  background: #404040;\n  border-radius: 0.5px;\n\n  /* Inside auto layout */\n  flex: none;\n  order: 1;\n  align-self: stretch;\n  flex-grow: 0;\n`;\n\nconst StyledLinkComponent = props => {\n  const {\n    to,\n    children,\n    className,\n    setOpen\n  } = props,\n        rest = _objectWithoutProperties(props, _excluded);\n\n  const location = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_2__.useLocation)().pathname;\n  const cn = classnames__WEBPACK_IMPORTED_MODULE_0___default()(className, 'navbar-link', {\n    ['navbar-link-open']: location == to\n  });\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(StyledLink, _objectSpread(_objectSpread({\n    to: to,\n    className: cn\n  }, rest), {}, {\n    onClick: () => {\n      setOpen(false);\n    },\n    children: [children, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(LinkDivider, {\n      \"aria-hidden\": true\n    })]\n  }));\n};\n\nconst NavbarMenu = _ref => {\n  let {\n    open,\n    setOpen\n  } = _ref;\n  const hamburgerClassname = classnames__WEBPACK_IMPORTED_MODULE_0___default()('nav-hamburger-list', {\n    ['nav-hamburger-list-open']: open\n  });\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(NavbarMenuComponent, {\n    className: hamburgerClassname,\n    id: \"nav-hamburger-list\",\n    role: \"menu\",\n    \"aria-labelledby\": \"nav-hamburger-button\",\n    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(PaddedContainer, {\n      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(StyledLinkComponent, {\n        setOpen: setOpen,\n        to: \"/home\",\n        children: \"home\"\n      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(StyledLinkComponent, {\n        setOpen: setOpen,\n        to: \"/works\",\n        children: \"works\"\n      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(StyledLinkComponent, {\n        setOpen: setOpen,\n        to: \"/articles\",\n        children: \"articles\"\n      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(StyledLinkComponent, {\n        setOpen: setOpen,\n        to: \"/contact\",\n        children: \"contact\"\n      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(StyledLinkComponent, {\n        setOpen: setOpen,\n        to: \"/links\",\n        children: \"links\"\n      })]\n    })\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavbarMenu);\n\n//# sourceURL=webpack://codyduongweb/./packages/components/Navbar/NavbarMenu.tsx?");

/***/ }),

/***/ "./packages/components/Navbar/index.tsx":
/*!**********************************************!*\
  !*** ./packages/components/Navbar/index.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* reexport safe */ _Navbar__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _Navbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Navbar */ \"./packages/components/Navbar/Navbar.tsx\");\n\n\n//# sourceURL=webpack://codyduongweb/./packages/components/Navbar/index.tsx?");

/***/ }),

/***/ "./packages/components/SpinkitLoadable/index.tsx":
/*!*******************************************************!*\
  !*** ./packages/components/SpinkitLoadable/index.tsx ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Spinner\": () => (/* binding */ Spinner),\n/* harmony export */   \"default\": () => (/* binding */ SpinkitLoadable)\n/* harmony export */ });\n/* harmony import */ var _loadable_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @loadable/component */ \"@loadable/component\");\n/* harmony import */ var _loadable_component__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_loadable_component__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);\nvar _jsxFileName = \"/home/cody_duong/codyduongweb/frontend/web/packages/components/SpinkitLoadable/index.tsx\";\n// document && require('spinkit/spinkit.css');\n\n\n\nfunction Spinner() {\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(\"div\", {\n    className: \"sk-circle\",\n    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"div\", {\n      className: \"sk-circle-dot\"\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"div\", {\n      className: \"sk-circle-dot\"\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"div\", {\n      className: \"sk-circle-dot\"\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"div\", {\n      className: \"sk-circle-dot\"\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"div\", {\n      className: \"sk-circle-dot\"\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"div\", {\n      className: \"sk-circle-dot\"\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"div\", {\n      className: \"sk-circle-dot\"\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"div\", {\n      className: \"sk-circle-dot\"\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"div\", {\n      className: \"sk-circle-dot\"\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"div\", {\n      className: \"sk-circle-dot\"\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"div\", {\n      className: \"sk-circle-dot\"\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(\"div\", {\n      className: \"sk-circle-dot\"\n    })]\n  });\n}\nfunction SpinkitLoadable(imported) {\n  return _loadable_component__WEBPACK_IMPORTED_MODULE_0___default()(() => imported, {\n    fallback: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(Spinner, {})\n  });\n}\n\n//# sourceURL=webpack://codyduongweb/./packages/components/SpinkitLoadable/index.tsx?");

/***/ }),

/***/ "./packages/components/Typography/index.tsx":
/*!**************************************************!*\
  !*** ./packages/components/Typography/index.tsx ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"H1\": () => (/* binding */ H1),\n/* harmony export */   \"H2\": () => (/* binding */ H2),\n/* harmony export */   \"H2css\": () => (/* binding */ H2css),\n/* harmony export */   \"H3\": () => (/* binding */ H3),\n/* harmony export */   \"H3css\": () => (/* binding */ H3css),\n/* harmony export */   \"H4\": () => (/* binding */ H4),\n/* harmony export */   \"H4css\": () => (/* binding */ H4css),\n/* harmony export */   \"H5\": () => (/* binding */ H5),\n/* harmony export */   \"H5css\": () => (/* binding */ H5css),\n/* harmony export */   \"H6\": () => (/* binding */ H6),\n/* harmony export */   \"H6css\": () => (/* binding */ H6css),\n/* harmony export */   \"Heading\": () => (/* binding */ Heading),\n/* harmony export */   \"Paragraph\": () => (/* binding */ Paragraph),\n/* harmony export */   \"Typography\": () => (/* binding */ Typography)\n/* harmony export */ });\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);\n\nconst HeadingCss = styled_components__WEBPACK_IMPORTED_MODULE_0__.css`\n  font-family: 'Overpass';\n  font-style: italic;\n  font-weight: 800;\n  margin: 0 0;\n  color: ${props => props.theme.color.text[500]};\n`;\nconst H1css = styled_components__WEBPACK_IMPORTED_MODULE_0__.css`\n  ${HeadingCss}\n  font-size: ${props => props.theme.spacing.rem[200]};\n`;\nconst H1 = Object.assign((styled_components__WEBPACK_IMPORTED_MODULE_0___default().h1)`\n    ${H1css}\n  `, {\n  css: H1css\n});\nconst H2css = styled_components__WEBPACK_IMPORTED_MODULE_0__.css`\n  ${HeadingCss}\n  font-size: ${props => props.theme.spacing.rem[150]};\n`;\nconst H2 = Object.assign((styled_components__WEBPACK_IMPORTED_MODULE_0___default().h2)`\n    ${H2css}\n  `, {\n  css: H2css\n});\nconst H3css = styled_components__WEBPACK_IMPORTED_MODULE_0__.css`\n  ${HeadingCss}\n  font-size: ${props => props.theme.spacing.rem(137.5)};\n`;\nconst H3 = Object.assign((styled_components__WEBPACK_IMPORTED_MODULE_0___default().h3)`\n    ${H3css}\n  `, {\n  css: H3css\n});\nconst H4css = styled_components__WEBPACK_IMPORTED_MODULE_0__.css`\n  ${HeadingCss}\n  font-size: ${props => props.theme.spacing.rem[125]};\n`;\nconst H4 = Object.assign((styled_components__WEBPACK_IMPORTED_MODULE_0___default().h4)`\n    ${H4css}\n  `, {\n  css: H4css\n});\nconst H5css = styled_components__WEBPACK_IMPORTED_MODULE_0__.css`\n  ${HeadingCss}\n  font-size: ${props => props.theme.spacing.rem(112.5)};\n`;\nconst H5 = Object.assign((styled_components__WEBPACK_IMPORTED_MODULE_0___default().h5)`\n    ${H5css}\n  `, {\n  css: H5css\n});\nconst H6css = styled_components__WEBPACK_IMPORTED_MODULE_0__.css`\n  ${HeadingCss}\n  font-size: ${props => props.theme.spacing.rem[100]};\n`;\nconst H6 = Object.assign((styled_components__WEBPACK_IMPORTED_MODULE_0___default().h6)`\n    ${H6css}\n  `, {\n  css: H6css\n});\nconst Heading = {\n  H1,\n  H2,\n  H3,\n  H4,\n  H5,\n  H6,\n  css: HeadingCss\n};\nconst PCss = styled_components__WEBPACK_IMPORTED_MODULE_0__.css`\n  font-family: 'Overpass';\n  font-weight: 500;\n  font-style: normal;\n  /* color: ${props => props.theme.color.text[400]}; */\n`;\nconst ItalicCss = styled_components__WEBPACK_IMPORTED_MODULE_0__.css`\n  font-style: italic;\n  font-weight: 300;\n`;\nconst BoldCss = styled_components__WEBPACK_IMPORTED_MODULE_0__.css`\n  font-weight: 900;\n  color: ${props => props.theme.color.text[500]};\n`;\nconst P2css = styled_components__WEBPACK_IMPORTED_MODULE_0__.css`\n  ${PCss}\n  font-size: calc(${props => props.theme.spacing.rem[150]});\n`;\nconst P3css = styled_components__WEBPACK_IMPORTED_MODULE_0__.css`\n  ${PCss}\n  font-size: calc(${props => props.theme.spacing.rem[100]});\n`;\nconst Paragraph = {\n  P2: Object.assign((styled_components__WEBPACK_IMPORTED_MODULE_0___default().p)`\n      ${P2css}\n    `, {\n    css: P2css,\n    italic: Object.assign((styled_components__WEBPACK_IMPORTED_MODULE_0___default().p)`\n          ${P2css}\n          ${ItalicCss}\n        `, {\n      css: styled_components__WEBPACK_IMPORTED_MODULE_0__.css`\n            ${P2css}\n            ${ItalicCss}\n          `\n    }),\n    bold: Object.assign((styled_components__WEBPACK_IMPORTED_MODULE_0___default().p)`\n          ${P2css}\n          ${BoldCss}\n        `, {\n      css: styled_components__WEBPACK_IMPORTED_MODULE_0__.css`\n            ${P2css}\n            ${BoldCss}\n          `\n    })\n  }),\n  P3: Object.assign((styled_components__WEBPACK_IMPORTED_MODULE_0___default().p)`\n      ${P3css}\n    `, {\n    css: P3css,\n    italic: Object.assign((styled_components__WEBPACK_IMPORTED_MODULE_0___default().p)`\n          ${P3css}\n          ${ItalicCss}\n        `, {\n      css: styled_components__WEBPACK_IMPORTED_MODULE_0__.css`\n            ${P3css}\n            ${ItalicCss}\n          `\n    }),\n    bold: Object.assign((styled_components__WEBPACK_IMPORTED_MODULE_0___default().p)`\n          ${P3css}\n          ${BoldCss}\n        `, {\n      css: styled_components__WEBPACK_IMPORTED_MODULE_0__.css`\n            ${P3css}\n            ${BoldCss}\n          `\n    })\n  }),\n  css: Object.assign(PCss, {\n    italic: ItalicCss,\n    bold: BoldCss\n  })\n};\nconst Typography = {\n  Heading,\n  Paragraph\n};\n\n//# sourceURL=webpack://codyduongweb/./packages/components/Typography/index.tsx?");

/***/ }),

/***/ "./packages/components/utils/index.ts":
/*!********************************************!*\
  !*** ./packages/components/utils/index.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst utils = {\n  focusFirstDescendant: function (element) {\n    for (let i = 0; i < element.childNodes.length; i++) {\n      const child = element.childNodes[i];\n\n      if (utils.attemptFocus(child) || utils.focusFirstDescendant(child)) {\n        return true;\n      }\n    }\n\n    return false;\n  },\n  focusLastDescendant: function (element) {\n    for (let i = element.childNodes.length - 1; i >= 0; i--) {\n      const child = element.childNodes[i];\n\n      if (utils.attemptFocus(child) || utils.focusLastDescendant(child)) {\n        return true;\n      }\n    }\n\n    return false;\n  },\n  attemptFocus: function (element) {\n    if (!utils.isFocusable(element)) {\n      return false;\n    }\n\n    try {\n      // @ts-expect-error: caught in next block\n      element.focus();\n    } catch (e) {// continue regardless of error\n    }\n\n    return document.activeElement === element;\n  },\n  isFocusable: function (element) {\n    if (element.tabIndex < 0) {\n      return false;\n    }\n\n    if (element.disabled) {\n      return false;\n    }\n\n    switch (element.nodeName) {\n      /**\n       * Per usual, varies dependent on browser implementation:\n       * https://stackoverflow.com/a/1600194/17954209\n       * https://www.w3.org/TR/DOM-Level-2-HTML/html.html\n       *\n       * Following W3 ARIA's discretion utilized here: https://www.w3.org/WAI/ARIA/apg/example-index/dialog-modal/dialog\n       */\n      case 'A':\n        return !!element.href && element.rel != 'ignore';\n\n      case 'INPUT':\n        return element.type != 'hidden';\n\n      case 'BUTTON':\n      case 'SELECT':\n      case 'TEXTAREA':\n        return true;\n\n      default:\n        return false;\n    }\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (utils);\n\n//# sourceURL=webpack://codyduongweb/./packages/components/utils/index.ts?");

/***/ }),

/***/ "./packages/mono-app/index.tsx":
/*!*************************************!*\
  !*** ./packages/mono-app/index.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* reexport safe */ _mono_app__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _mono_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mono-app */ \"./packages/mono-app/mono-app.tsx\");\n\n\n//# sourceURL=webpack://codyduongweb/./packages/mono-app/index.tsx?");

/***/ }),

/***/ "./packages/mono-app/mono-app.tsx":
/*!****************************************!*\
  !*** ./packages/mono-app/mono-app.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var packages_themed__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! packages/themed */ \"./packages/themed/index.ts\");\n/* harmony import */ var packages_components_SpinkitLoadable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! packages/components/SpinkitLoadable */ \"./packages/components/SpinkitLoadable/index.tsx\");\n/* harmony import */ var packages_pages_Page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! packages/pages/Page */ \"./packages/pages/Page.tsx\");\n/* harmony import */ var packages_pages_links_Links__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! packages/pages/links/Links */ \"./packages/pages/links/Links.tsx\");\n/* harmony import */ var packages_components_3D_Construction3D__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! packages/components/3D/Construction3D */ \"./packages/components/3D/Construction3D.tsx\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);\nvar _jsxFileName = \"/home/cody_duong/codyduongweb/frontend/web/packages/mono-app/mono-app.tsx\";\n\n\n\n\n\n\n\n\n\nconst Home = (0,packages_components_SpinkitLoadable__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(__webpack_require__.e(/*! import() */ \"packages_pages_Home_tsx\").then(__webpack_require__.bind(__webpack_require__, /*! packages/pages/Home */ \"./packages/pages/Home.tsx\")));\nconst NotFound = (0,packages_components_SpinkitLoadable__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(__webpack_require__.e(/*! import() */ \"packages_pages_404_NotFound_tsx\").then(__webpack_require__.bind(__webpack_require__, /*! packages/pages/404/NotFound */ \"./packages/pages/404/NotFound.tsx\")));\n\nfunction App() {\n  const [theme] = (0,packages_themed__WEBPACK_IMPORTED_MODULE_2__.useThemeBase)();\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(styled_components__WEBPACK_IMPORTED_MODULE_1__.ThemeProvider, {\n    theme: theme,\n    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(packages_pages_Page__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)(react_router_dom__WEBPACK_IMPORTED_MODULE_0__.Routes, {\n        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_0__.Route, {\n          path: \"/\",\n          element: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(Home, {})\n        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_0__.Route, {\n          path: \"/home\",\n          element: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(Home, {})\n        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_0__.Route, {\n          path: \"/links\",\n          element: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(packages_pages_links_Links__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {})\n        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_0__.Route, {\n          path: \"/works\",\n          element: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(packages_components_3D_Construction3D__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {})\n        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_0__.Route, {\n          path: \"/articles\",\n          element: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(packages_components_3D_Construction3D__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {})\n        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_0__.Route, {\n          path: \"/contact\",\n          element: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(packages_components_3D_Construction3D__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {})\n        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_0__.Route, {\n          path: \"*\",\n          element: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(NotFound, {})\n        })]\n      })\n    })\n  });\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);\n\n//# sourceURL=webpack://codyduongweb/./packages/mono-app/mono-app.tsx?");

/***/ }),

/***/ "./packages/pages/Page.tsx":
/*!*********************************!*\
  !*** ./packages/pages/Page.tsx ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Page)\n/* harmony export */ });\n/* harmony import */ var packages_components_Navbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! packages/components/Navbar */ \"./packages/components/Navbar/index.tsx\");\n/* harmony import */ var packages_style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! packages/style */ \"./packages/style/index.ts\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);\nvar _jsxFileName = \"/home/cody_duong/codyduongweb/frontend/web/packages/pages/Page.tsx\";\n\n\n\n\n\nconst PageDiv = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().div)`\n  width: 100vw;\n  max-width: 100%;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  background-color: ${props => props.theme.color.surface[100]};\n  color: ${props => props.theme.color.text[400]};\n`;\nconst PageContent = (styled_components__WEBPACK_IMPORTED_MODULE_2___default().main)`\n  flex-direction: column;\n  flex: 1;\n  overflow-x: hidden;\n  /* \n  @media only screen and (min-width: ${packages_style__WEBPACK_IMPORTED_MODULE_1__.breakpoints.md}) {\n    padding: 1rem 2.5rem;\n  }\n\n  @media only screen and (min-width: ${packages_style__WEBPACK_IMPORTED_MODULE_1__.breakpoints.lg}) {\n    padding: 1rem 5rem;\n  }\n\n  @media only screen and (min-width: ${packages_style__WEBPACK_IMPORTED_MODULE_1__.breakpoints.xxl}) {\n    padding: 1rem 7.5rem;\n  } */\n`;\nfunction Page(props) {\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxs)(PageDiv, {\n    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(packages_components_Navbar__WEBPACK_IMPORTED_MODULE_0__[\"default\"], {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PageContent, {\n      children: props.children\n    })]\n  });\n}\n\n//# sourceURL=webpack://codyduongweb/./packages/pages/Page.tsx?");

/***/ }),

/***/ "./packages/pages/links/Links.tsx":
/*!****************************************!*\
  !*** ./packages/pages/links/Links.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Links)\n/* harmony export */ });\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var packages_style_breakpoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! packages/style/breakpoints */ \"./packages/style/breakpoints.ts\");\n/* harmony import */ var packages_components_A__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! packages/components/A */ \"./packages/components/A/index.tsx\");\n/* harmony import */ var _mui_icons_material_GitHub__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @mui/icons-material/GitHub */ \"@mui/icons-material/GitHub\");\n/* harmony import */ var _mui_icons_material_GitHub__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_GitHub__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _mui_icons_material_LinkedIn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mui/icons-material/LinkedIn */ \"@mui/icons-material/LinkedIn\");\n/* harmony import */ var _mui_icons_material_LinkedIn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mui_icons_material_LinkedIn__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _StackOverflow_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./StackOverflow.svg */ \"./packages/pages/links/StackOverflow.svg\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);\nvar _jsxFileName = \"/home/cody_duong/codyduongweb/frontend/web/packages/pages/links/Links.tsx\";\n\n\n\n\n\n\n\n\nconst LinksSection = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().section)`\n  display: flex;\n  flex-flow: column nowrap;\n  align-items: center;\n  justify-content: center;\n  height: 80vh;\n`;\nconst LinksHeader = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().h1)`\n  font-size: 2rem;\n\n  @media only screen and (min-width: ${packages_style_breakpoints__WEBPACK_IMPORTED_MODULE_1__[\"default\"].md}) {\n    font-size: 2rem;\n  }\n`;\nconst LinksWrapper = (styled_components__WEBPACK_IMPORTED_MODULE_0___default().div)`\n  display: flex;\n  flex-flow: row wrap;\n  max-width: ${packages_style_breakpoints__WEBPACK_IMPORTED_MODULE_1__[\"default\"].sm} + 1rem;\n  gap: 4rem;\n  justify-content: center;\n  margin-bottom: 100px;\n`;\nconst LinksLink = styled_components__WEBPACK_IMPORTED_MODULE_0___default()(packages_components_A__WEBPACK_IMPORTED_MODULE_2__[\"default\"])`\n  text-decoration: none;\n  text-align: center;\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  cursor: pointer;\n\n  svg {\n    font-size: 2rem;\n    padding-left: 1rem;\n    fill: currentColor;\n  }\n\n  p {\n    padding-right: 1rem;\n  }\n`;\nconst LINKS = [{\n  label: 'codyduong',\n  to: 'https://github.com/codyduong',\n  icon: (_mui_icons_material_GitHub__WEBPACK_IMPORTED_MODULE_3___default())\n}, {\n  label: 'cody-duong',\n  to: 'https://www.linkedin.com/in/cody-duong/',\n  icon: (_mui_icons_material_LinkedIn__WEBPACK_IMPORTED_MODULE_4___default())\n}, {\n  label: 'cody-duong',\n  to: 'https://stackoverflow.com/users/17954209/cody-duong',\n  icon: _StackOverflow_svg__WEBPACK_IMPORTED_MODULE_5__[\"default\"]\n} // {\n//   label: 'GitHub4',\n//   to: 'https://github.com/codyduong',\n//   icon: GitHubIcon,\n// },\n// {\n//   label: 'GitHub5',\n//   to: 'https://github.com/codyduong',\n//   icon: GitHubIcon,\n// },\n];\n\nconst GenerateLinks = () => {\n  return LINKS.map(L => {\n    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(LinksLink, {\n      href: L.to,\n      target: '_blank',\n      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(L.icon, {\n        \"aria-hidden\": true\n      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(\"p\", {\n        children: L.label\n      })]\n    }, `${L.label} ${L.to}`);\n  });\n};\n\nfunction Links() {\n  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(LinksSection, {\n    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(LinksHeader, {\n      children: \"Socials\"\n    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(LinksWrapper, {\n      children: GenerateLinks()\n    })]\n  });\n}\n\n//# sourceURL=webpack://codyduongweb/./packages/pages/links/Links.tsx?");

/***/ }),

/***/ "./packages/style/breakpoints.ts":
/*!***************************************!*\
  !*** ./packages/style/breakpoints.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"breakpointsNum\": () => (/* binding */ breakpointsNum),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst breakpoints = {\n  xs: '420px',\n  sm: '576px',\n  md: '768px',\n  lg: '992px',\n  xl: '1200px',\n  xxl: '1400px'\n};\nconst breakpointsNum = {\n  xs: 420,\n  sm: 576,\n  md: 768,\n  lg: 992,\n  xl: 1200,\n  xxl: 1400\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (breakpoints);\n\n//# sourceURL=webpack://codyduongweb/./packages/style/breakpoints.ts?");

/***/ }),

/***/ "./packages/style/index.ts":
/*!*********************************!*\
  !*** ./packages/style/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"breakpoints\": () => (/* reexport safe */ _breakpoints__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   \"commoncss\": () => (/* binding */ commoncss)\n/* harmony export */ });\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _breakpoints__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./breakpoints */ \"./packages/style/breakpoints.ts\");\n\n\nconst commoncss = {\n  focus: styled_components__WEBPACK_IMPORTED_MODULE_0__.css`\n    :focus {\n      outline: ${_ref => {\n    let {\n      theme\n    } = _ref;\n    return theme.color.base[300];\n  }} 2px solid;\n    }\n    @supports selector(:focus-visible) {\n      &:focus {\n        outline: none;\n      }\n      &:focus-visible {\n        outline: ${_ref2 => {\n    let {\n      theme\n    } = _ref2;\n    return theme.color.base[300];\n  }} 2px solid;\n      }\n    }\n  `\n};\n\n//# sourceURL=webpack://codyduongweb/./packages/style/index.ts?");

/***/ }),

/***/ "./packages/themed/index.ts":
/*!**********************************!*\
  !*** ./packages/themed/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"useThemeBase\": () => (/* reexport safe */ _util__WEBPACK_IMPORTED_MODULE_0__.useThemeBase)\n/* harmony export */ });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./packages/themed/util.ts\");\n\n\n//# sourceURL=webpack://codyduongweb/./packages/themed/index.ts?");

/***/ }),

/***/ "./packages/themed/themes/DEFAULT.tsx":
/*!********************************************!*\
  !*** ./packages/themed/themes/DEFAULT.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"DEFAULT\": () => (/* binding */ DEFAULT)\n/* harmony export */ });\n/* harmony import */ var packages_themed_themes_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! packages/themed/themes/common */ \"./packages/themed/themes/common.ts\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n// export const DEFAULTold = {\n//   bgDark: '#111111',\n//   bg: '#222222',\n//   bgHighlight: '#333333',\n//   contentSecondary: '#5e5e5e',\n//   base: '#808080',\n//   contentPrimary: '#838383',\n//   contentEmphasized: '#a0a0a0',\n//   fg: '#dfdfdf',\n//   fgHighlight: '#eeeeee',\n//   yellow: '#b58900',\n//   orange: '#cb4b16',\n//   red: '#dc322f',\n//   magenta: '#d33682',\n//   violet: '#6c71c4',\n//   blue: '#268bd2',\n//   cyan: '#2aa198',\n//   green: '#859900',\n// } as const,\nconst DEFAULT = _objectSpread({\n  color: {\n    text: {\n      100: '#ffffff',\n      200: '#bababa',\n      300: '#808080',\n      400: '#404040',\n      500: '#1b1b1b',\n      600: '#0a0a0a'\n    },\n    surface: {\n      100: '#ffffff',\n      200: '#cecece',\n      300: '#b0b0b0',\n      400: '#252525',\n      500: '#050505'\n    },\n    base: {\n      100: '#8cd7ff',\n      200: '#53c3ff',\n      300: '#00A4FF',\n      400: '',\n      500: ''\n    },\n    bottom: {\n      100: '',\n      200: '',\n      300: '',\n      400: '',\n      500: ''\n    },\n    info: {\n      100: '',\n      200: '',\n      300: '',\n      400: '',\n      500: ''\n    },\n    warning: {\n      100: '',\n      200: '',\n      300: '',\n      400: '',\n      500: ''\n    },\n    destructive: {\n      100: '',\n      200: '',\n      300: '',\n      400: '',\n      500: ''\n    },\n    productive: {\n      100: '#a3eea9',\n      200: '#57cc61',\n      300: '#30ad3a',\n      400: '#1c9426',\n      500: '#06470c' // l400: '#a3eea9',\n      // l300: '#7ad882',\n      // l200: '#57cc61',\n      // l100: '#40be4b',\n      // base: '#30ad3a',\n      // d100: '#25a130',\n      // d200: '#1c9426',\n      // d300: '#0c5e13',\n      // d400: '#06470c',\n\n    }\n  }\n}, packages_themed_themes_common__WEBPACK_IMPORTED_MODULE_0__.COMMON_THEME);\n\n//# sourceURL=webpack://codyduongweb/./packages/themed/themes/DEFAULT.tsx?");

/***/ }),

/***/ "./packages/themed/themes/common.ts":
/*!******************************************!*\
  !*** ./packages/themed/themes/common.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"COMMON_THEME\": () => (/* binding */ COMMON_THEME)\n/* harmony export */ });\nfunction remFunction(n) {\n  return `${n / 100}rem`;\n}\n\nfunction pxFunction(n) {\n  return `${n / 100 * 16}px`;\n}\n\nconst COMMON_THEME = {\n  spacing: {\n    rem: Object.assign(remFunction, {\n      12.5: '0.0125rem',\n      25: '0.25rem',\n      50: '0.5rem',\n      100: '1rem',\n      125: '1.25rem',\n      150: '1.5rem',\n      200: '2rem',\n      250: '2.5rem',\n      300: '3rem',\n      350: '3.5rem',\n      400: '4rem',\n      450: '4.5rem',\n      500: '5rem',\n      800: '8rem',\n      1000: '10rem'\n    }),\n    px: Object.assign(pxFunction, {\n      12.5: '2px',\n      25: '4px',\n      50: '8px',\n      100: '16px',\n      125: '20px',\n      150: '24px',\n      200: '32px',\n      250: '40px',\n      300: '48px',\n      350: '56px',\n      400: '64px',\n      450: '72px',\n      500: '80px',\n      800: '128px',\n      1000: '160px'\n    })\n  }\n};\n\n//# sourceURL=webpack://codyduongweb/./packages/themed/themes/common.ts?");

/***/ }),

/***/ "./packages/themed/themes/index.ts":
/*!*****************************************!*\
  !*** ./packages/themed/themes/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _DEFAULT__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DEFAULT */ \"./packages/themed/themes/DEFAULT.tsx\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\nconst themes = _objectSpread({}, _DEFAULT__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (themes);\n\n//# sourceURL=webpack://codyduongweb/./packages/themed/themes/index.ts?");

/***/ }),

/***/ "./packages/themed/util.ts":
/*!*********************************!*\
  !*** ./packages/themed/util.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"useThemeBase\": () => (/* binding */ useThemeBase)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./themes */ \"./packages/themed/themes/index.ts\");\n\n\nfunction useThemeBase() {\n  const [theme, setTheme] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(_themes__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DEFAULT);\n\n  const setThemeOverride = value => {\n    setTheme(value);\n  };\n\n  return [theme, setThemeOverride];\n}\n\n//# sourceURL=webpack://codyduongweb/./packages/themed/util.ts?");

/***/ }),

/***/ "./server/app.js":
/*!***********************!*\
  !*** ./server/app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _cra_express_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cra-express/core */ \"@cra-express/core\");\n/* harmony import */ var _cra_express_core__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_cra_express_core__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);\nvar _jsxFileName = \"/home/cody_duong/codyduongweb/frontend/web/server/app.js\";\n\n\n\n\n\nlet App = (__webpack_require__(/*! ../src/index */ \"./src/index.tsx\")[\"default\"]);\n\nconst clientBuildPath = path__WEBPACK_IMPORTED_MODULE_0___default().resolve(__dirname, '../client');\nconst app = (0,_cra_express_core__WEBPACK_IMPORTED_MODULE_2__.createReactAppExpress)({\n  clientBuildPath,\n  universalRender: (req, res) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(App, {})\n});\n\nif (true) {\n  module.hot.accept(/*! ../src/index */ \"./src/index.tsx\", __WEBPACK_OUTDATED_DEPENDENCIES__ => { (() => {\n    App = (__webpack_require__(/*! ../src/index */ \"./src/index.tsx\")[\"default\"]);\n    console.log('✅ Server hot reloaded App');\n  })(__WEBPACK_OUTDATED_DEPENDENCIES__); });\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (app);\n\n//# sourceURL=webpack://codyduongweb/./server/app.js?");

/***/ }),

/***/ "./server/index.js":
/*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const app = (__webpack_require__(/*! ./app */ \"./server/app.js\")[\"default\"]);\n\nconst PORT = process.env.PORT || 3001;\napp.listen(PORT, () => {\n  console.log(`CRA Server listening on port ${PORT}!`);\n});\n\n//# sourceURL=webpack://codyduongweb/./server/index.js?");

/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ \"react-dom/client\");\n/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom_client__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var packages_style_globals_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! packages/style/globals.css */ \"./packages/style/globals.css\");\n/* harmony import */ var packages_style_globals_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(packages_style_globals_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _reportWebVitals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reportWebVitals */ \"./src/reportWebVitals.ts\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var packages_mono_app__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! packages/mono-app */ \"./packages/mono-app/index.tsx\");\n/* harmony import */ var _loadable_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @loadable/component */ \"@loadable/component\");\n/* harmony import */ var _loadable_component__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_loadable_component__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-dom */ \"react-dom\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);\nvar _jsxFileName = \"/home/cody_duong/codyduongweb/frontend/web/src/index.tsx\";\n\n\n // https://github.com/webpack-contrib/style-loader/issues/461#issuecomment-593957042\n\ndocument && __webpack_require__(/*! @fontsource/overpass */ \"@fontsource/overpass\");\n\n\n\n\n\n\nconst root = react_dom_client__WEBPACK_IMPORTED_MODULE_1___default().createRoot(document.getElementById('root'));\n\nif (process.env.SSR) {\n  (0,_loadable_component__WEBPACK_IMPORTED_MODULE_6__.loadableReady)(() => {\n    (0,react_dom__WEBPACK_IMPORTED_MODULE_7__.hydrate)( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().StrictMode), {\n      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.BrowserRouter, {\n        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(packages_mono_app__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {})\n      })\n    }), document.getElementById('root'));\n  });\n} else {\n  root.render( /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)((react__WEBPACK_IMPORTED_MODULE_0___default().StrictMode), {\n    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.BrowserRouter, {\n      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(packages_mono_app__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {})\n    })\n  }));\n} // If you want to start measuring performance in your app, pass a function\n// to log results (for example: reportWebVitals(console.log))\n// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals\n\n\n(0,_reportWebVitals__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n\n//# sourceURL=webpack://codyduongweb/./src/index.tsx?");

/***/ }),

/***/ "./src/reportWebVitals.ts":
/*!********************************!*\
  !*** ./src/reportWebVitals.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst reportWebVitals = onPerfEntry => {\n  if (onPerfEntry && onPerfEntry instanceof Function) {\n    Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! web-vitals */ \"web-vitals\", 23)).then(_ref => {\n      let {\n        getCLS,\n        getFID,\n        getFCP,\n        getLCP,\n        getTTFB\n      } = _ref;\n      getCLS(onPerfEntry);\n      getFID(onPerfEntry);\n      getFCP(onPerfEntry);\n      getLCP(onPerfEntry);\n      getTTFB(onPerfEntry);\n    });\n  }\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reportWebVitals);\n\n//# sourceURL=webpack://codyduongweb/./src/reportWebVitals.ts?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./packages/style/globals.css":
/*!**************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./packages/style/globals.css ***!
  \**************************************************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.id, \"html,\\nbody {\\n  background-color: #ffffff;\\n  padding: 0;\\n  margin: 0;\\n  font-family: Overpass, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,\\n    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;\\n  font-size: 16px;\\n}\\nheader {\\n  transition: all 225ms ease-in-out;\\n}\\ndiv {\\n  transition: all 0.5s ease-in-out;\\n  transition: height 0s ease-in-out;\\n  transition: width  0s ease-in-out;\\n}\\na {\\n  all: unset;\\n  text-decoration: none;\\n}\\na:focus {\\n  outline: #00A4FF 1px auto;\\n}\\nbutton {\\n  all: unset;\\n  cursor: pointer;\\n}\\nbutton:focus {\\n  outline: #00A4FF 1px auto;\\n}\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack://codyduongweb/./packages/style/globals.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./packages/style/globals.css":
/*!************************************!*\
  !*** ./packages/style/globals.css ***!
  \************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("\n    var refs = 0;\n    var css = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./globals.css */ \"./node_modules/css-loader/dist/cjs.js!./packages/style/globals.css\");\n    var insertCss = __webpack_require__(/*! !../../node_modules/isomorphic-style-loader/insertCss.js */ \"./node_modules/isomorphic-style-loader/insertCss.js\");\n    var content = typeof css === 'string' ? [[module.id, css, '']] : css;\n\n    exports = module.exports = css.locals || {};\n    exports._getContent = function() { return content; };\n    exports._getCss = function() { return '' + css; };\n    exports._insertCss = function(options) { return insertCss(content, options) };\n\n    // Hot Module Replacement\n    // https://webpack.github.io/docs/hot-module-replacement\n    // Only activated in browser context\n    if ( true && typeof window !== 'undefined' && window.document) {\n      var removeCss = function() {};\n      module.hot.accept(/*! !!../../node_modules/css-loader/dist/cjs.js!./globals.css */ \"./node_modules/css-loader/dist/cjs.js!./packages/style/globals.css\", function() {\n        css = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./globals.css */ \"./node_modules/css-loader/dist/cjs.js!./packages/style/globals.css\");\n        content = typeof css === 'string' ? [[module.id, css, '']] : css;\n        removeCss = insertCss(content, { replace: true });\n      });\n      module.hot.dispose(function() { removeCss(); });\n    }\n  \n\n//# sourceURL=webpack://codyduongweb/./packages/style/globals.css?");

/***/ }),

/***/ "./node_modules/isomorphic-style-loader/insertCss.js":
/*!***********************************************************!*\
  !*** ./node_modules/isomorphic-style-loader/insertCss.js ***!
  \***********************************************************/
/***/ ((module) => {

"use strict";
eval("/*! Isomorphic Style Loader | MIT License | https://github.com/kriasoft/isomorphic-style-loader */\n\n\n\nvar inserted = {};\n\nfunction b64EncodeUnicode(str) {\n  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {\n    return String.fromCharCode(\"0x\" + p1);\n  }));\n}\n\nfunction removeCss(ids) {\n  ids.forEach(function (id) {\n    if (--inserted[id] <= 0) {\n      var elem = document.getElementById(id);\n\n      if (elem) {\n        elem.parentNode.removeChild(elem);\n      }\n    }\n  });\n}\n\nfunction insertCss(styles, _temp) {\n  var _ref = _temp === void 0 ? {} : _temp,\n      _ref$replace = _ref.replace,\n      replace = _ref$replace === void 0 ? false : _ref$replace,\n      _ref$prepend = _ref.prepend,\n      prepend = _ref$prepend === void 0 ? false : _ref$prepend,\n      _ref$prefix = _ref.prefix,\n      prefix = _ref$prefix === void 0 ? 's' : _ref$prefix;\n\n  var ids = [];\n\n  for (var i = 0; i < styles.length; i++) {\n    var _styles$i = styles[i],\n        moduleId = _styles$i[0],\n        css = _styles$i[1],\n        media = _styles$i[2],\n        sourceMap = _styles$i[3];\n    var id = \"\" + prefix + moduleId + \"-\" + i;\n    ids.push(id);\n\n    if (inserted[id]) {\n      if (!replace) {\n        inserted[id]++;\n        continue;\n      }\n    }\n\n    inserted[id] = 1;\n    var elem = document.getElementById(id);\n    var create = false;\n\n    if (!elem) {\n      create = true;\n      elem = document.createElement('style');\n      elem.setAttribute('type', 'text/css');\n      elem.id = id;\n\n      if (media) {\n        elem.setAttribute('media', media);\n      }\n    }\n\n    var cssText = css;\n\n    if (sourceMap && typeof btoa === 'function') {\n      cssText += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + b64EncodeUnicode(JSON.stringify(sourceMap)) + \"*/\";\n      cssText += \"\\n/*# sourceURL=\" + sourceMap.file + \"?\" + id + \"*/\";\n    }\n\n    if ('textContent' in elem) {\n      elem.textContent = cssText;\n    } else {\n      elem.styleSheet.cssText = cssText;\n    }\n\n    if (create) {\n      if (prepend) {\n        document.head.insertBefore(elem, document.head.childNodes[0]);\n      } else {\n        document.head.appendChild(elem);\n      }\n    }\n  }\n\n  return removeCss.bind(null, ids);\n}\n\nmodule.exports = insertCss;\n//# sourceMappingURL=insertCss.js.map\n\n\n//# sourceURL=webpack://codyduongweb/./node_modules/isomorphic-style-loader/insertCss.js?");

/***/ }),

/***/ "@cra-express/core":
/*!************************************!*\
  !*** external "@cra-express/core" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@cra-express/core");

/***/ }),

/***/ "@fontsource/overpass":
/*!***************************************!*\
  !*** external "@fontsource/overpass" ***!
  \***************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@fontsource/overpass");

/***/ }),

/***/ "@loadable/component":
/*!**************************************!*\
  !*** external "@loadable/component" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@loadable/component");

/***/ }),

/***/ "@mui/icons-material/GitHub":
/*!*********************************************!*\
  !*** external "@mui/icons-material/GitHub" ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/icons-material/GitHub");

/***/ }),

/***/ "@mui/icons-material/LinkedIn":
/*!***********************************************!*\
  !*** external "@mui/icons-material/LinkedIn" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/icons-material/LinkedIn");

/***/ }),

/***/ "@mui/icons-material/Menu":
/*!*******************************************!*\
  !*** external "@mui/icons-material/Menu" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/icons-material/Menu");

/***/ }),

/***/ "@mui/icons-material/MenuOpen":
/*!***********************************************!*\
  !*** external "@mui/icons-material/MenuOpen" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@mui/icons-material/MenuOpen");

/***/ }),

/***/ "@react-three/cannon":
/*!**************************************!*\
  !*** external "@react-three/cannon" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@react-three/cannon");

/***/ }),

/***/ "@react-three/drei":
/*!************************************!*\
  !*** external "@react-three/drei" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@react-three/drei");

/***/ }),

/***/ "@react-three/fiber":
/*!*************************************!*\
  !*** external "@react-three/fiber" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@react-three/fiber");

/***/ }),

/***/ "@theatre/core":
/*!********************************!*\
  !*** external "@theatre/core" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@theatre/core");

/***/ }),

/***/ "@theatre/r3f":
/*!*******************************!*\
  !*** external "@theatre/r3f" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("@theatre/r3f");

/***/ }),

/***/ "classnames":
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("classnames");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react-dom/client":
/*!***********************************!*\
  !*** external "react-dom/client" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom/client");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-router-dom");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("styled-components");

/***/ }),

/***/ "three":
/*!************************!*\
  !*** external "three" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("three");

/***/ }),

/***/ "three-stdlib":
/*!*******************************!*\
  !*** external "three-stdlib" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("three-stdlib");

/***/ }),

/***/ "three/examples/jsm/loaders/MTLLoader":
/*!*******************************************************!*\
  !*** external "three/examples/jsm/loaders/MTLLoader" ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("three/examples/jsm/loaders/MTLLoader");

/***/ }),

/***/ "three/examples/jsm/loaders/OBJLoader":
/*!*******************************************************!*\
  !*** external "three/examples/jsm/loaders/OBJLoader" ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("three/examples/jsm/loaders/OBJLoader");

/***/ }),

/***/ "web-vitals":
/*!*****************************!*\
  !*** external "web-vitals" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("web-vitals");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".chunk.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return ".hot/" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => (".hot/" + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("bed3d7ec4a7264a9f120")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results);
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							},
/******/ 							[])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								} else {
/******/ 									return setStatus("ready").then(function () {
/******/ 										return updatedModules;
/******/ 									});
/******/ 								}
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 				// handle errors in accept handlers and self accepted module load
/******/ 				if (error) {
/******/ 					return setStatus("fail").then(function () {
/******/ 						throw error;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				if (queuedInvalidatedModules) {
/******/ 					return internalApply(options).then(function (list) {
/******/ 						outdatedModules.forEach(function (moduleId) {
/******/ 							if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 						});
/******/ 						return list;
/******/ 					});
/******/ 				}
/******/ 		
/******/ 				return setStatus("idle").then(function () {
/******/ 					return outdatedModules;
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/require chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "loaded", otherwise not loaded yet
/******/ 		var installedChunks = __webpack_require__.hmrS_require = __webpack_require__.hmrS_require || {
/******/ 			"main": 1
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		var installChunk = (chunk) => {
/******/ 			var moreModules = chunk.modules, chunkIds = chunk.ids, runtime = chunk.runtime;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			for(var i = 0; i < chunkIds.length; i++)
/******/ 				installedChunks[chunkIds[i]] = 1;
/******/ 		
/******/ 		};
/******/ 		
/******/ 		// require() chunk loading for javascript
/******/ 		__webpack_require__.f.require = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					installChunk(require("./" + __webpack_require__.u(chunkId)));
/******/ 				} else installedChunks[chunkId] = 1;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no external install chunk
/******/ 		
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			var update = require("./" + __webpack_require__.hu(chunkId));
/******/ 			var updatedModules = update.modules;
/******/ 			var runtime = update.runtime;
/******/ 			for(var moduleId in updatedModules) {
/******/ 				if(__webpack_require__.o(updatedModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = updatedModules[moduleId];
/******/ 					if(updatedModulesList) updatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 		}
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.requireHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err, {
/******/ 										moduleId: moduleId,
/******/ 										module: __webpack_require__.c[moduleId]
/******/ 									});
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.require = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.require = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.requireHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = function() {
/******/ 			return Promise.resolve().then(function() {
/******/ 				return require("./" + __webpack_require__.hmrF());
/******/ 			})['catch'](function(err) { if(err.code !== 'MODULE_NOT_FOUND') throw err; });
/******/ 		}
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__("./server/index.js");
/******/ 	
/******/ })()
;