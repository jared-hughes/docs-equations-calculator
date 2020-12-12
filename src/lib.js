/**
 * Produces a list of each LaTeX-converted versions of each child of element.
 *
 * @param {Equation|EquationFunction} element The given element
 */
function latexifyChildList(element) {
  let out = [];
  for (let i=0; i < element.getNumChildren(); i++) {
    const child = element.getChild(i);
    if (child.getType() != DocumentApp.ElementType.EQUATION_FUNCTION_ARGUMENT_SEPARATOR) {
      out.push(latexify(child))
    }
  }
  return out;
}

/**
 * Converts the given element to LaTeX, automatically transferring special
 * symbols such as "\superscript{x}{y}" to canonical LaTeX forms such as "x^{y}"
 *
 * @param {EquationFunction} element
 */
function latexifyFunc(element) {
  const code = element.getCode();
  const children = latexifyChildList(element);
//  Slice to remove "\\"
  switch (code.slice(1)) {
    case "superscript":
      return children[0] + "^{" + children[1] + "}"
    case "subscript":
      return children[0] + "_{" + children[1] + "}"
    case "rootof":
      return `\\sqrt[${children[0]}]{${children[1]}}`;
    case "subsuperscript":
      return `${children[0]}_{${children[1]}}^{${children[2]}}`;
    case "bigcapab":
    case "bigcupab":
    case "prodab":
    case "coprodab":
    case "intab":
    case "ointab":
    case "sumab":
      return `${code.slice(0,-2)}_{${children[0]}}^{${children[1]}}`
    case "limab":
      // space after \rvert in case of e.g. lim_{a->b}, which would cause
      // "undefined control sequence \rightarrowb"
      return `\\lim_{${children[0]}\\rightarrow ${children[1]}}`
    case "rbracelr":
      return `\\left(${children[0]}\\right)`
    case "sbracelr":
      return `\\left[${children[0]}\\right]`
    case "bracelr":
      return `\\left\\{${children[0]}\\right\\}`
    case "abs":
      // space after \rvert in case of e.g. |a-b|x, which would cause undefined
      // "control sequence \rvertx"
      return `\\lvert{${children[0]}}\\rvert `
    default:
      return code + "{" + children.join("}{") + "}"
  }
}


/**
 * Converts Docs element to LaTeX string.
 *
 * Probably would have a problem if the Docs Equation is edited during
 * evaluation.
 *
 * @param {Equation|EquationFunction|EquationSymbol|Text} element
 */
function latexify(element) {
//  Probably this has problems with edits during calculation
  switch (element.getType()) {
    case DocumentApp.ElementType.EQUATION:
      return latexifyChildList(element).join("");
    case DocumentApp.ElementType.EQUATION_FUNCTION:
      return latexifyFunc(element);
    case DocumentApp.ElementType.EQUATION_SYMBOL:
      return element.getCode();
    case DocumentApp.ElementType.TEXT:
      return element.getText();
    default:
      throw new Error(`Element ${element.getType()} unhandled in latexify.`);
  }
}

/**
 * Parses and computes the equation under the user's cursor.
 */
function queryCalc() {
  const cursor = DocumentApp.getActiveDocument().getCursor();

  if (cursor) {
    let el = cursor.getElement();

    //  Cannot merely check if type is one of the four Equation* types because
    //  Text elements can be inside or outside an equation
    const stopTypes = [DocumentApp.ElementType.EQUATION, DocumentApp.ElementType.DOCUMENT]
    while (!stopTypes.includes(el.getType())) {
      el = el.getParent()
    }
    if (el.getType() == DocumentApp.ElementType.EQUATION) {
      return {
        latex: latexify(el),
        evaluated: 42
      }
    } else {
      throw new Error('Not an equation.');
    }
  } else {
    throw new Error('Cannot find a cursor.');
  }
}

export {
  queryCalc
}
