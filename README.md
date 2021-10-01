# yalc-sample-spfx-library-component

## Summary

This project contains an SPFx Component Library with shared code for multiple SPFx solutions. 
You can use this repo to test the use of yalc with dev containers and SPFx Library Components. 
There is another repo which contains the webpart solution. [That can be found here](https://github.com/martinlingstuyl/yalc-sample-spfx-webparts).

## Used SharePoint Framework Version

![version](https://img.shields.io/npm/v/@microsoft/sp-component-base/latest?color=green)


## Prerequisites

You need the following prerequisites:
- Docker Desktop with WSL integration enabled
- Visual Studio Code with the following extensions
  - ms-azuretools.vscode-docker
  - ms-vscode-remote.remote-containers


## Version history

Version|Date|Comments
-------|----|--------
1.0|Oktober 1st, 2021|Initial release


## Getting started
Using Docker/Dev container is handy to separate tools and dependencies used in different projects. But it also adds complexities. For example: Multiple cloned SPFx solutions will end up in different Docker containers. These cannot interact for obvious reasons. A library component therefore cannot be linked in the normal way. (using `npm link`) A solution would be to add all the SPFx solutions in the same repository, but this is not ideal as it would create dependencies between them. (node version, global yo version etc)

We can work around this by adding an extra `_shared` folder in the docker environment and adding this folder as an extra mounted location in every devcontainer. Using `yalc` the library can be published to this folder and linked in the other projects. 

First, we'll need to create the `_shared` folder in the Docker environment.

1. Open a PowerShell window and execute the following script. This will create a priviliged container from which we can access the Docker file system.

   ```PowerShell
   docker run -it --privileged --pid=host ubuntu nsenter -t 1 -m -u    -i sh
   ```

2. Navigate to the `/var/lib/docker/volumes` folder. This is where the devcontainer volumes are stored.

   ```bash
   cd /var/lib/docker/volumes
   ```

3. Create a `_shared` folder in the volumes folder.

    ```bash
    mkdir _shared
    ```

Now that we have created a `_shared` folder, we can continue cloning the repo:

4. Copy the git clone url from GitHub
5. Open a new window of VS Code
6. Use the command palette to execute 'Remote-Containers: Clone repository in container volume'. This will clone the repo and build the devcontainer
7. Ensure that you are at the solution folder
8. in the command-line run the following script:
  
    ```bash
    npm install
    gulp bundle
    yalc publish . --store-folder /_shared
    ```    

   You have now published a bundled version of the library repository to the _shared folder. 
   
   To reference this from a webpart solution, please head over to the other GitHub repo and clone that in a unique volume to continue. The follow-up instructions are in the readme.
   
## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

- [Library Component tutorial](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/library-component-tutorial)

- [Where are docker images stored](https://www.freecodecamp.org/news/where-are-docker-images-stored-docker-container-paths-explained/)

- [Link devcontainers using yalc](https://stackoverflow.com/questions/68670700/npm-link-dev-packages-when-using-docker-dev-containers)

- [yalc documentation](https://www.npmjs.com/package/yalc)