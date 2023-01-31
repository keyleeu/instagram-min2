"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = require("fs");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _client = _interopRequireDefault(require("../../client"));

var _users = require("../users.utils");

var _shared = require("../../shared/shared.utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var resolverFn = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
    var firstName, lastName, username, email, newPassword, bio, avatar, loggedInUser, avatarUrl, uglyPassword, updatedUser;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            firstName = _ref.firstName, lastName = _ref.lastName, username = _ref.username, email = _ref.email, newPassword = _ref.password, bio = _ref.bio, avatar = _ref.avatar;
            loggedInUser = _ref2.loggedInUser;
            avatarUrl = null;

            if (!avatar) {
              _context.next = 7;
              break;
            }

            _context.next = 6;
            return (0, _shared.uploadToS3)(avatar, loggedInUser.id, "avatars");

          case 6:
            avatarUrl = _context.sent;

          case 7:
            uglyPassword = null;

            if (!newPassword) {
              _context.next = 12;
              break;
            }

            _context.next = 11;
            return _bcrypt["default"].hash(newPassword, 10);

          case 11:
            uglyPassword = _context.sent;

          case 12:
            _context.next = 14;
            return _client["default"].user.update({
              where: {
                id: loggedInUser.id
              },
              data: _objectSpread(_objectSpread({
                firstName: firstName,
                lastName: lastName,
                username: username,
                email: email,
                bio: bio
              }, uglyPassword && {
                password: uglyPassword
              }), avatarUrl && {
                avatar: avatarUrl
              })
            });

          case 14:
            updatedUser = _context.sent;

            if (!updatedUser.id) {
              _context.next = 19;
              break;
            }

            return _context.abrupt("return", {
              ok: true
            });

          case 19:
            return _context.abrupt("return", {
              ok: false,
              error: "Could not update profile."
            });

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function resolverFn(_x, _x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = {
  Mutation: {
    editProfile: (0, _users.protectedResolver)(resolverFn)
  }
};
exports["default"] = _default;