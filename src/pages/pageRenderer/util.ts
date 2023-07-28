import { Parser, Node, } from "acorn"
import { full } from "acorn-walk"

interface customNode extends Node {
  name?: string;
  value?: string;
  operator?: string;
}

function parseExpressions(rule: string): {
  fieldsName: string[];
  literals: string[];
  operators: string[];
  logicalExpressions: string[];
} {
  const fieldsName: string[] = []
  const literals: string[] = []
  const operators: string[] = []
  const logicalExpressions: string[] = []
  try {
    const parseExpression = Parser.parse(rule, {
      ecmaVersion: "latest",
    })

    full(parseExpression, (node) => {
      const { name, value, operator } = node as customNode

      switch (node.type) {
        case "Identifier":
          fieldsName.push(name ?? "")
          break
        case "Literal":
          literals.push(value ?? "")
          break
        case "BinaryExpression":
          operators.push(operator ?? "")
          break
        case "LogicalExpression":
          logicalExpressions.push(operator ?? "")
          break

        default:
          break
      }
    })
  } catch (e) {
    console.log(e)
  }
  return { fieldsName, literals, operators, logicalExpressions }
}

function compareExpressions(
  value: any,
  operator: string,
  literals: string
): boolean {
  switch (operator) {
    case "==":
      return value == literals
    case "===":
      return value === literals
    case ">":
      return value > literals
    case "<":
      return value < literals
    case ">=":
      return value >= literals
    case "<=":
      return value <= literals
    case "!=":
      return value != literals
    case "!==":
      return value !== literals

    default:
      return false
  }
}

function comparelogicalExpressions(
  firstValue: boolean,
  operator: string,
  secondValue: boolean
): boolean {
  switch (operator) {
    case "&&":
      return firstValue && secondValue
    case "||":
      return firstValue || secondValue

    default:
      return false
  }
}

function validation({
  values,
  literals,
  operators,
  logicalExpressions,
}: {
  values: any[];
  literals: string[];
  operators: string[];
  logicalExpressions: string[];
}): boolean {
  const result: boolean[] = [];
  values.forEach((value, index) => {
    result.push(compareExpressions(value, operators[index], literals[index]));
  });
  if (logicalExpressions.length > 0) {
    return result.reduce((previousValue, currentValue, index) => {
      if (index == 0) {
        return currentValue;
      } else {
        return comparelogicalExpressions(
          previousValue,
          logicalExpressions[index - 1],
          currentValue
        );
      }
    }, true);
  } else {
    return result[0];
  }
}

export { parseExpressions, validation };
