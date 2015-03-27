/**
 * Created by Johnny IV Young Ospino on 26/03/2015.
 */
(function () {
    'use strict';
    angular.module('utility').directive('onlynumbers', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                var keyCode = [8, 9, 37, 39, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
                    96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 110, 190
                ];
                element.bind("keydown", function (event) {
                    if (keyCode.indexOf(event.which) == -1) {
                        scope.$apply(function () {
                            scope.$eval(attrs.onlyNumbers);
                            event.preventDefault();
                        });
                        event.preventDefault();
                    }
                });


                scope.$watch(attrs.ngModel, function (newValue, oldValue) {
                    var spiltArray = String(newValue).split("");

                    if (attrs.allowNegative == "false") {
                        if (spiltArray[0] == '-') {
                            newValue = newValue.replace("-", "");
                            ngModel.$setViewValue(newValue);
                            ngModel.$render();
                        }
                    }

                    if (attrs.allowDecimal == "false") {
                        newValue = parseInt(newValue);
                        ngModel.$setViewValue(newValue);
                        ngModel.$render();
                    }

                    if (attrs.allowDecimal != "false") {
                        if (attrs.decimalUpto) {
                            var n = String(newValue).split(".");
                            if (n[1]) {
                                var n2 = n[1].slice(0, attrs.decimalUpto);
                                newValue = [n[0], n2].join(".");
                                ngModel.$setViewValue(newValue);
                                ngModel.$render();
                            }
                        }
                    }


                    if (spiltArray.length === 0) return;
                    if (spiltArray.length === 1 && (spiltArray[0] == '-' || spiltArray[0] === '.' )) return;
                    if (spiltArray.length === 2 && newValue === '-.') return;

                    /*Check it is number or not.*/
                    if (newValue != undefined && isNaN(newValue)) {
                        ngModel.$setViewValue(oldValue);
                        ngModel.$render();
                    }


                    //verify max number
                    var maximum = scope.$eval(attrs.maxNumber);
                    if (maximum && (newValue > maximum )) {
                        ngModel.$setViewValue(maximum);
                        ngModel.$render();
                    }

                    //verify min number
                    var minimum = scope.$eval(attrs.minNumber);
                    if (minimum && (newValue < minimum)) {
                        ngModel.$setViewValue(minimum);
                        ngModel.$render();
                    }
                });
            }
        };
    });
})();
