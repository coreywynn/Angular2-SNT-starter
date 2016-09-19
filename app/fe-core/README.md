# SNT Media Core Framework for Frontend

This repo is a git submodule repository for modular deployment of core codebase changes across all the SNT Media verticals. This core repo is included as a subdirectory in each of the SNT Media vertical repositories. Changes made to this repo will eventually be reflected across all the other repos, when the core submodule is updated for each respective parent repo. Changes made to this repo directory when inside of another project repo will be ignored on git push unless explicitly specified. The correct way to make changes to this repo is to clone it separately and edit it on its own. Once changes are made to this repo, they can then be pulled into each of the repos that are using this repo as a dependancy.


To include this repo as a git submodule dependancy in a project, follow the steps below, or refer to: https://git-scm.com/book/en/v2/Git-Tools-Submodules


If the parent repo already has the core included simply run:

1. Initialize the parent repo `git clone --recursive https://yourRepoUrl`. And the folder where the submodule was declared will be populated with the submodule


If you are creating a new project and want to include the core submodule:

1. Initialize the parent repo `git clone https://yourRepoUrl`.

2. cd into the parent directory you want to add the core submodule into

3. Initialize the submodule `git submodule add https://github.com/passit/SNT-framework-core-frontend.git`


If you want to update to the latest version of Core Framework in your project that already includes core:

1. cd into the core submodule directory

2. Fetch the latest updates to the core `git fetch`

3. Merge the updated changes into the parent project `git merge origin/<submodule branch you want to merge from>`

## ChangeLog:


### Ver 1.0
1. Added changeLog
2. added css for responsive profile header at 320px and updated backtab css
3. responsive css for daily update
4. responsive css for other content you will love
5. header and hamburger menu modularity and leagues
6. footer new design
7. team roster sticky table columns
8. responsive draft history and sorting
9. responsive article pages and AI headline module
10. responsive directory page and update design
