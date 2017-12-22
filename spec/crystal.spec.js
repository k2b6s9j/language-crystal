describe("Crystal grammar", () => {
  let grammar;

  beforeEach(async () => {
    await atom.packages.activatePackage("language-crystal-actual");

    grammar = atom.grammars.grammarForScopeName("source.crystal");
  });

  it("parses the grammar", () => {
    expect(grammar).toBeTruthy();
    expect(grammar.scopeName).toBe("source.crystal");
  });

  it("tokenizes self", () => {
    ({ tokens } = grammar.tokenizeLine("self"));
    expect(tokens).toMatchSnapshot();
  });

  it("tokenizes symbols", () => {
    ({ tokens } = grammar.tokenizeLine(":test"));
    expect(tokens).toMatchSnapshot();
    
    ({ tokens } = grammar.tokenizeLine(":$symbol"));
    expect(tokens).toMatchSnapshot();
  });

  it("tokenizes %{} style strings", () => {
    ({ tokens } = grammar.tokenizeLine("%{te{s}t}"));
    expect(tokens).toMatchSnapshot();
  });

  it("tokenizes %() style strings", () => {
    ({ tokens } = grammar.tokenizeLine("%(te(s)t)"));
    expect(tokens).toMatchSnapshot();
  });

  it("tokenizes %[] style strings", () => {
    ({ tokens } = grammar.tokenizeLine("%[te[s]t]"));
    expect(tokens).toMatchSnapshot();
  });

  it("tokenizes %<> style strings", () => {
    ({ tokens } = grammar.tokenizeLine("%<te<s>t>"));
    expect(tokens).toMatchSnapshot();
  });

  it("tokenizes regular expressions", () => {
    ({ tokens } = grammar.tokenizeLine("/test/"));
    expect(tokens).toMatchSnapshot();
    
    ({ tokens } = grammar.tokenizeLine("/{w}/"));
    expect(tokens).toMatchSnapshot();
    
    ({ tokens } = grammar.tokenizeLine("a_method /test/"));
    expect(tokens).toMatchSnapshot();
    
    ({ tokens } = grammar.tokenizeLine("a_method(/test/)"));
    expect(tokens).toMatchSnapshot();
    
    ({ tokens } = grammar.tokenizeLine('/test/.match("test")'));
    expect(tokens).toMatchSnapshot();
    
    ({ tokens } = grammar.tokenizeLine("foo(4 / 2).split(/c/)"));
    expect(tokens).toMatchSnapshot();
    
    ({ tokens } = grammar.tokenizeLine("[/test/,3]"));
    expect(tokens).toMatchSnapshot();
    
    ({ tokens } = grammar.tokenizeLine("[/test/]"));
    expect(tokens).toMatchSnapshot();
    
    ({ tokens } = grammar.tokenizeLine("/test/ && 4"));
    expect(tokens).toMatchSnapshot();
    
    ({ tokens } = grammar.tokenizeLine("/test/ || 4"));
    expect(tokens).toMatchSnapshot();
    
    ({ tokens } = grammar.tokenizeLine("/test/ ? 4 : 3"));
    expect(tokens).toMatchSnapshot();
    
    ({ tokens } = grammar.tokenizeLine("/test/ : foo"));
    expect(tokens).toMatchSnapshot();
    
    ({ tokens } = grammar.tokenizeLine("{a: /test/}"));
    expect(tokens).toMatchSnapshot();
  });

  it("tokenizes the / arithmetic operator", () => {
    ({ tokens } = grammar.tokenizeLine("call/me/maybe"));
    expect(tokens).toMatchSnapshot();
    
    ({ tokens } = grammar.tokenizeLine("(1+2)/3/4"));
    expect(tokens).toMatchSnapshot();
    
    ({ tokens } = grammar.tokenizeLine("1 / 2 / 3"));
    expect(tokens).toMatchSnapshot();
    
    ({ tokens } = grammar.tokenizeLine("1/ 2 / 3"));
    expect(tokens).toMatchSnapshot();
    
    ({ tokens } = grammar.tokenizeLine("1 / 2/ 3"));
    expect(tokens).toMatchSnapshot();
  });

  it("tokenizes the 'Hello World' example", () => {
    ({ tokens } = grammar.tokenizeLine('puts "Hello world!"'));
    expect(tokens).toMatchSnapshot();
  });

  it("tokenizes requires", () => {
    ({ tokens } = grammar.tokenizeLine('require "http/server"'));
    expect(tokens).toMatchSnapshot();
  });

  it("tokenizes comments", () => {
    ({ tokens } = grammar.tokenizeLine("# This is a comment"));
    expect(tokens).toMatchSnapshot();
  });

  it("tokenizes `nil`", () => {
    ({ tokens } = grammar.tokenizeLine("nil"));
    expect(tokens).toMatchSnapshot();
  });

  it("tokenizes `true`", () => {
    ({ tokens } = grammar.tokenizeLine("true"));
    expect(tokens).toMatchSnapshot();
  });

  it("tokenizes `false`", () => {
    ({ tokens } = grammar.tokenizeLine("false"));
    expect(tokens).toMatchSnapshot();
  });
});
