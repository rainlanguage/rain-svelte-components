let
 pkgs = import
    (builtins.fetchTarball {
      name = "nixpkgs-unstable-2023-03-14";
      url = "https://github.com/nixos/nixpkgs/archive/b8afc8489dc96f29f69bec50fdc51e27883f89c1.tar.gz";
      sha256 = "sha256:0qqbfw86szws150m2ryrsc5wzklf91ydcd2f370n8z7ax6792drj";
    })
    { };

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
