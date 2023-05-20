[![CircleCI](https://circleci.com/gh/tuimac/fileserver.svg?style=shield)](https://circleci.com/gh/tuimac/fileserver)

# Simple Web File Server
This is the simple file server through the browser.

## How to use
You need to prepare the docker installed environment for this fileserver. Then you've already had that, you just run the command below.<br>

```bash
docker run -itd -p <ANY PORT>:80 -v <VOLUME>:<TARGET DIR> tuimac/fileserver
```

When you run the above command, you need to define each configuration below.

| Configuration Name | Detail |
| - | - |
| ANY PORT | This is the port you want to publish for this fileserver application. You can set any port you want except the port already reserved by the other application. |
| VOLUME | You can mount to the directory on the OS or docker volume. |
| TARGET DIR | You select the directory path you want to store the files within the fileserver container. |

That's it. Really easy.

## Docker images
I create Docker images for x86 and aarch64 environment by buildx. [Here](https://hub.docker.com/r/tuimac/fileserver) is the docker image repository.

## Authors

* **Kento Kashiwagi** - [tuimac](https://github.com/tuimac)

If you have some opinions and find bugs, please post [here](https://github.com/tuimac/fileserver/issues).

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Coming up the next

- Edit file funciton.
- Display current directory function.
