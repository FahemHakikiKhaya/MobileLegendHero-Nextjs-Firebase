import React from "react";

export default function Compare(newRoles, newLanes, oldRoles, oldLanes) {
  var deletedRoles = [];
  var deletedLanes = [];
  var addedRoles = [];
  var addedLanes = [];

  oldLanes.map((a) => {
    var havePair = false;
    newLanes.map((b) => {
      if (a == b) {
        havePair = true;
      }
    });
    if (!havePair) {
      deletedLanes.push(a);
    }
  });

  newLanes.map((a) => {
    var havePair = false;
    oldLanes.map((b) => {
      if (a == b) {
        havePair = true;
      }
    });
    if (!havePair) {
      addedLanes.push(a);
    }
  });
  oldRoles.map((a) => {
    var havePair = false;
    newRoles.map((b) => {
      if (a == b) {
        havePair = true;
      }
    });
    if (!havePair) {
      deletedRoles.push(a);
    }
  });

  newRoles.map((a) => {
    var havePair = false;
    oldRoles.map((b) => {
      if (a == b) {
        havePair = true;
      }
    });
    if (!havePair) {
      addedRoles.push(a);
    }
  });
  return { deletedLanes, deletedRoles, addedLanes, addedRoles };
}
