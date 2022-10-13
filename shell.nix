let
 pkgs = import <nixpkgs> {};

 dev = pkgs.writeShellScriptBin "dev" ''
  yarn dev
 '';

 mnemonic = pkgs.writeShellScriptBin "mnemonic" ''
  mnemonics
 '';

in
pkgs.stdenv.mkDerivation {
 name = "shell";
 buildInputs = [
  pkgs.yarn
  pkgs.nodePackages.npm
  pkgs.nodejs-16_x
  dev
  mnemonic
 ];

 shellHook = ''
  source .env
  export PATH=$( npm bin ):$PATH
  git submodule update --init
  # keep it fresh
  yarn
 '';
}
