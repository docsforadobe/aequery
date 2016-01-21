/*
 * CSS like attribute parsing.
 *
 * Parses strings like `comp[name=myComp] layer[name=myLayer light=true selected]` to objects.
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
  = name:[a-zA-Z]+ _? { var o = {}; var key = name.join(''); o[key] = true; return o; }

ValuePair
  = name:[a-zA-Z]+ "=" value:Value _? { var o = {}; var key = name.join(''); o[key] = value; return o; }

Selector
  = type:[a-zA-Z]+ props:Properties? _? { return { type: type.join(''), props: props } }

Selectors
  = Selector+

Value
  = BooleanLiteral
  / StringLiteral

BooleanLiteral
  = TrueToken  { return true }
  / FalseToken { return false }

StringLiteral
  = chars:[a-zA-Z]+ { return chars.join('') }

TrueToken       = "true"           _?
FalseToken      = "false"          _?

_ "whitespace"
  = [ \t\n\r]*
