'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.postMessage = postMessage;
const connections = {};

function postMessage(tabId, message) {
  if (tabId in connections) {
    return connections[tabId.toString()].postMessage(message);
  }
}

chrome.runtime.onConnect.addListener(port => {
  function handleMessage(message, _port) {
    var _port$sender, _port$sender2, _port$sender2$tab;

    const tabId =
      message.tabId ||
      typeof ((_port$sender = port.sender) === null || _port$sender === void 0
        ? void 0
        : _port$sender.tab) !== 'undefined'
        ? (_port$sender2 = port.sender) === null || _port$sender2 === void 0
          ? void 0
          : (_port$sender2$tab = _port$sender2.tab) === null ||
            _port$sender2$tab === void 0
          ? void 0
          : _port$sender2$tab.id
        : null;
    const actions = {
      log: () => (tabId ? postMessage(tabId, message) : undefined),
      register: () => {
        var _port$sender3, _port$sender3$tab;

        return ((_port$sender3 = port.sender) === null ||
        _port$sender3 === void 0
        ? void 0
        : (_port$sender3$tab = _port$sender3.tab) === null ||
          _port$sender3$tab === void 0
        ? void 0
        : _port$sender3$tab.id)
          ? (connections[port.sender.tab.id.toString()] = port)
          : undefined;
      }
    };

    const action = (actionName => actions[actionName])(message.action);

    return action();
  }

  port.onMessage.addListener(handleMessage);
  port.onDisconnect.addListener(port => {
    port.onMessage.removeListener(handleMessage);
    Object.keys(connections).forEach(tabIdString => {
      if (connections[tabIdString] == port) delete connections[tabIdString];
    });
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9iYWNrZ3JvdW5kLnRzIl0sIm5hbWVzIjpbImNvbm5lY3Rpb25zIiwicG9zdE1lc3NhZ2UiLCJ0YWJJZCIsIm1lc3NhZ2UiLCJ0b1N0cmluZyIsImNocm9tZSIsInJ1bnRpbWUiLCJvbkNvbm5lY3QiLCJhZGRMaXN0ZW5lciIsInBvcnQiLCJoYW5kbGVNZXNzYWdlIiwiX3BvcnQiLCJzZW5kZXIiLCJ0YWIiLCJpZCIsImFjdGlvbnMiLCJsb2ciLCJ1bmRlZmluZWQiLCJyZWdpc3RlciIsImFjdGlvbiIsImFjdGlvbk5hbWUiLCJvbk1lc3NhZ2UiLCJvbkRpc2Nvbm5lY3QiLCJyZW1vdmVMaXN0ZW5lciIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwidGFiSWRTdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLE1BQU1BLFdBQWtCLEdBQUcsRUFBM0I7O0FBRU8sU0FBU0MsV0FBVCxDQUFxQkMsS0FBckIsRUFBb0NDLE9BQXBDLEVBQXNEO0FBQzNELE1BQUlELEtBQUssSUFBSUYsV0FBYixFQUEwQjtBQUN4QixXQUFPQSxXQUFXLENBQUNFLEtBQUssQ0FBQ0UsUUFBTixFQUFELENBQVgsQ0FBOEJILFdBQTlCLENBQTBDRSxPQUExQyxDQUFQO0FBQ0Q7QUFDRjs7QUFFREUsTUFBTSxDQUFDQyxPQUFQLENBQWVDLFNBQWYsQ0FBeUJDLFdBQXpCLENBQXNDQyxJQUFELElBQWdCO0FBQ25ELFdBQVNDLGFBQVQsQ0FBdUJQLE9BQXZCLEVBQXlDUSxLQUF6QyxFQUFzRDtBQUFBOztBQUNwRCxVQUFNVCxLQUFLLEdBQUlDLE9BQU8sQ0FBQ0QsS0FBUixJQUFpQix3QkFBT08sSUFBSSxDQUFDRyxNQUFaLGlEQUFPLGFBQWFDLEdBQXBCLE1BQTRCLFdBQTdDLG9CQUNYSixJQUFJLENBQUNHLE1BRE0sdUVBQ1gsY0FBYUMsR0FERixzREFDWCxrQkFBa0JDLEVBRFAsR0FFWCxJQUZKO0FBR0EsVUFBTUMsT0FBZ0IsR0FBRztBQUN2QkMsTUFBQUEsR0FBRyxFQUFFLE1BQU9kLEtBQUssR0FBR0QsV0FBVyxDQUFDQyxLQUFELEVBQVFDLE9BQVIsQ0FBZCxHQUFpQ2MsU0FEM0I7QUFFdkJDLE1BQUFBLFFBQVEsRUFBRTtBQUFBOztBQUFBLGVBQ1Isa0JBQUFULElBQUksQ0FBQ0csTUFBTCxxRkFBYUMsR0FBYix3RUFBa0JDLEVBQWxCLElBQ0tkLFdBQVcsQ0FBQ1MsSUFBSSxDQUFDRyxNQUFMLENBQVlDLEdBQVosQ0FBZ0JDLEVBQWhCLENBQW1CVixRQUFuQixFQUFELENBQVgsR0FBNkNLLElBRGxELEdBRUlRLFNBSEk7QUFBQTtBQUZhLEtBQXpCOztBQU9BLFVBQU1FLE1BQU0sR0FBRyxDQUFFQyxVQUFELElBQXdCTCxPQUFPLENBQUNLLFVBQUQsQ0FBaEMsRUFDYmpCLE9BQU8sQ0FBQ2dCLE1BREssQ0FBZjs7QUFHQSxXQUFPQSxNQUFNLEVBQWI7QUFDRDs7QUFDRFYsRUFBQUEsSUFBSSxDQUFDWSxTQUFMLENBQWViLFdBQWYsQ0FBMkJFLGFBQTNCO0FBQ0FELEVBQUFBLElBQUksQ0FBQ2EsWUFBTCxDQUFrQmQsV0FBbEIsQ0FBK0JDLElBQUQsSUFBZ0I7QUFDNUNBLElBQUFBLElBQUksQ0FBQ1ksU0FBTCxDQUFlRSxjQUFmLENBQThCYixhQUE5QjtBQUNBYyxJQUFBQSxNQUFNLENBQUNDLElBQVAsQ0FBWXpCLFdBQVosRUFBeUIwQixPQUF6QixDQUFrQ0MsV0FBRCxJQUF5QjtBQUN4RCxVQUFJM0IsV0FBVyxDQUFDMkIsV0FBRCxDQUFYLElBQTRCbEIsSUFBaEMsRUFBc0MsT0FBT1QsV0FBVyxDQUFDMkIsV0FBRCxDQUFsQjtBQUN2QyxLQUZEO0FBR0QsR0FMRDtBQU1ELENBeEJEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9ucywgTWVzc2FnZSwgUG9ydCwgUG9ydHMgfSBmcm9tICcuL3R5cGVzJztcblxuY29uc3QgY29ubmVjdGlvbnM6IFBvcnRzID0ge307XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3N0TWVzc2FnZSh0YWJJZDogbnVtYmVyLCBtZXNzYWdlOiBNZXNzYWdlKSB7XG4gIGlmICh0YWJJZCBpbiBjb25uZWN0aW9ucykge1xuICAgIHJldHVybiBjb25uZWN0aW9uc1t0YWJJZC50b1N0cmluZygpXS5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgfVxufVxuXG5jaHJvbWUucnVudGltZS5vbkNvbm5lY3QuYWRkTGlzdGVuZXIoKHBvcnQ6IFBvcnQpID0+IHtcbiAgZnVuY3Rpb24gaGFuZGxlTWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlLCBfcG9ydDogUG9ydCkge1xuICAgIGNvbnN0IHRhYklkID0gKG1lc3NhZ2UudGFiSWQgfHwgdHlwZW9mIHBvcnQuc2VuZGVyPy50YWIgIT09ICd1bmRlZmluZWQnXG4gICAgICA/IHBvcnQuc2VuZGVyPy50YWI/LmlkXG4gICAgICA6IG51bGwpIGFzIG51bWJlciB8IG51bGw7XG4gICAgY29uc3QgYWN0aW9uczogQWN0aW9ucyA9IHtcbiAgICAgIGxvZzogKCkgPT4gKHRhYklkID8gcG9zdE1lc3NhZ2UodGFiSWQsIG1lc3NhZ2UpIDogdW5kZWZpbmVkKSxcbiAgICAgIHJlZ2lzdGVyOiAoKSA9PlxuICAgICAgICBwb3J0LnNlbmRlcj8udGFiPy5pZFxuICAgICAgICAgID8gKGNvbm5lY3Rpb25zW3BvcnQuc2VuZGVyLnRhYi5pZC50b1N0cmluZygpXSA9IHBvcnQpXG4gICAgICAgICAgOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGNvbnN0IGFjdGlvbiA9ICgoYWN0aW9uTmFtZTogc3RyaW5nKSA9PiBhY3Rpb25zW2FjdGlvbk5hbWVdKShcbiAgICAgIG1lc3NhZ2UuYWN0aW9uXG4gICAgKTtcbiAgICByZXR1cm4gYWN0aW9uKCk7XG4gIH1cbiAgcG9ydC5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoaGFuZGxlTWVzc2FnZSk7XG4gIHBvcnQub25EaXNjb25uZWN0LmFkZExpc3RlbmVyKChwb3J0OiBQb3J0KSA9PiB7XG4gICAgcG9ydC5vbk1lc3NhZ2UucmVtb3ZlTGlzdGVuZXIoaGFuZGxlTWVzc2FnZSk7XG4gICAgT2JqZWN0LmtleXMoY29ubmVjdGlvbnMpLmZvckVhY2goKHRhYklkU3RyaW5nOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmIChjb25uZWN0aW9uc1t0YWJJZFN0cmluZ10gPT0gcG9ydCkgZGVsZXRlIGNvbm5lY3Rpb25zW3RhYklkU3RyaW5nXTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==
