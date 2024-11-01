{ pkgs }: {
  channel = "stable-23.11";
  packages = [
    pkgs.redis
    pkgs.postgresql
    pkgs.bun
    pkgs.gh
    pkgs.go
    pkgs.nodejs_latest
    pkgs.curl
    pkgs.git
    pkgs.systemd
    pkgs.zsh
    pkgs.python3
    pkgs.deno
    pkgs.rustc
    pkgs.rustup
  ];
  idx.extensions = [
    "Continue.continue"
    "DavidAnson.vscode-markdownlint"
    "GitHub.vscode-pull-request-github"
    "PKief.material-icon-theme"
    "Supermaven.supermaven"
    "Vue.volar"
    "WakaTime.vscode-wakatime"
    "adpyke.vscode-sql-formatter"
    "antfu.theme-vitesse"
    "astro-build.houston"
    "atlassian.atlascode"
    "biomejs.biome"
    "bmewburn.vscode-intelephense-client"
    "bradlc.vscode-tailwindcss"
    "clinyong.vscode-css-modules"
    "dbaeumer.vscode-eslint"
    "denoland.vscode-deno-canary"
    "donjayamanne.githistory"
    "dtsvet.vscode-wasm"
    "eamodio.gitlens"
    "ecmel.vscode-html-css"
    "esbenp.prettier-vscode"
    "golang.Go"
    "jock.svg"
    "ktiays.aicursor"
    "mechatroner.rainbow-csv"
    "ms-azuretools.vscode-docker"
    "ms-ossdata.vscode-postgresql"
    "muhammad-sammy.rider-theme"
    "Nuxtr.nuxtr-vscode"
    "rangav.vscode-thunder-client"
    "ritwickdey.LiveServer"
    "rust-lang.rust-analyzer"
    "sourcegraph.cody-ai"
    "streetsidesoftware.code-spell-checker"
    "stylelint.vscode-stylelint"
    "svelte.svelte-vscode"
    "usernamehw.errorlens"
    "wesbos.theme-cobalt2"
    "wheredoesyourmindgo.gruvbox-concoctis"
    "yoavbls.pretty-ts-errors"
  ];
  services = {
    postgres = {
      enable = true;
    };
    docker = {
      enable = true;
    };
    redis = {
      enable = true;
    };
  };
  idx.workspace.onCreate = {
    npm-install-globals = "npm install -g --unsafe-perm localtunnel yarn pnpm spa-http-server ngrok eslint";
    # files to open when the workspace is first opened.
    default.openFiles = [ "README.md" ];
  };
}
