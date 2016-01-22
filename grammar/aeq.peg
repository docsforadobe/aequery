/*
 * CSS like attribute parsing.
 *
 * Parses strings like `comp[index=165468 selected]:not(name="myComp") layer[color=0xFFFFFF]:first():not(selected)` to an AST.
 */

{
  function mergeProps(array){
    var merged = {};

    for (var i = 0; i < array.length; i++) {
      var pair = array[i]
      for (var key in pair) {
        merged[key] = pair[key]
      }
    }

    return merged;
  }
}

Start
  = Selectors

Properties
  = props:Property+ { return mergeProps(props) }

Property
  = ValuePair
  / ValueSingle

ValueSingle
  = name:[a-zA-Z]+ _ { var o = {}; var key = name.join(''); o[key] = { type: 'Bool', value: true }; return o; }

ValuePair
  = name:[a-zA-Z]+ "=" value:Value _? { var o = {}; var key = name.join(''); o[key] = value; return o; }

Selector
  = type:[a-zA-Z]+ '[' props:Properties? ']' pseudo:Pseudo+ _? {
    return { type: type.join(''), props: props, pseudo: pseudo }
  }

Selectors
  = Selector+

Pseudo
  = ":" type:[a-z]* "(" props:Properties? ")" { return { type: type.join(''), props: props } }

Value
  = BooleanLiteral
  / NumericLiteral
  / StringLiteral

NumericLiteral
  = literal:HexIntegerLiteral !(DecimalDigit) { return literal; }
  / literal:DecimalLiteral { return literal; }

BooleanLiteral
  = TrueToken  { return { type: 'Bool', value: true } }
  / FalseToken { return { type: 'Bool', value: false } }

DecimalIntegerLiteral
  = "0"
  / NonZeroDigit DecimalDigit*

DecimalDigit
  = [0-9]

NonZeroDigit
  = [1-9]

DecimalLiteral
  = DecimalIntegerLiteral "." DecimalDigit* { return { type: 'Number', value: parseFloat(text()) } }
  / "." DecimalDigit+ { return { type: 'Number', value: parseFloat(text()) } }
  / DecimalIntegerLiteral { return { type: 'Integer', value: parseFloat(text()) } }

HexIntegerLiteral
  = "0x"i digits:$HexDigit+ { return { type: "Hex", value: parseInt(digits, 16) } }

HexDigit
  = [0-9a-f]i

StringLiteral
  = QuoteToken text:[0-9a-zA-Z]+ QuoteToken { return { type: 'String', value: text.join('') } }

QuoteToken
  = DoubleQuoteToken
  / SingleQuoteToken

DoubleQuoteToken
  = '"'

SingleQuoteToken
  = "'"

TrueToken       = "true"           _?
FalseToken      = "false"          _?

_ "whitespace"
  = [ \t\n\r]*
