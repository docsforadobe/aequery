/*
 * CSS like attribute parsing.
 *
 * Parses strings like `comp[name="myComp"] layer[name="myLayer" light=true selected]` to objects.
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
  = '[' props:Property+ ']' { return mergeProps(props) }

Property
  = ValuePair
  / ValueSingle

ValueSingle
  = name:[a-zA-Z]+ _ { var o = {}; var key = name.join(''); o[key] = true; return o; }

ValuePair
  = name:[a-zA-Z]+ "=" value:Value _? { var o = {}; var key = name.join(''); o[key] = value; return o; }

Selector
  = type:[a-zA-Z]+ props:Properties? _? { return { type: type.join(''), props: props } }

Selectors
  = Selector+

Value
  = BooleanLiteral
  / NumericLiteral
  / StringLiteral

NumericLiteral
  = literal:HexIntegerLiteral !(DecimalDigit) { return literal; }
  / literal:DecimalLiteral { return literal; }

BooleanLiteral
  = TrueToken  { return true }
  / FalseToken { return false }

DecimalIntegerLiteral
  = "0"
  / NonZeroDigit DecimalDigit*

DecimalDigit
  = [0-9]

NonZeroDigit
  = [1-9]

DecimalLiteral
  = DecimalIntegerLiteral "." DecimalDigit* { return parseFloat(text()); }
  / "." DecimalDigit+ { return parseFloat(text()); }
  / DecimalIntegerLiteral { return parseFloat(text()); }

HexIntegerLiteral
  = "0x"i digits:$HexDigit+ { return "0x" + digits.toUpperCase(); }

HexDigit
  = [0-9a-f]i

StringLiteral
  = QuoteToken text:[0-9a-zA-Z]+ QuoteToken { return text.join('') }

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
