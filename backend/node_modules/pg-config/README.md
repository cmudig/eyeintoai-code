Example output:

```
{
        "paths": {
                "bin": "/Library/PostgreSQL/9.3/bin",
                "doc": "/Library/PostgreSQL/9.3/doc/postgresql",
                "html": "/Library/PostgreSQL/9.3/doc/postgresql",
                "include": "/Library/PostgreSQL/9.3/include",
                "pkginclude": "/Library/PostgreSQL/9.3/include/postgresql",
                "include-server": "/Library/PostgreSQL/9.3/include/postgresql/server",
                "lib": "/Library/PostgreSQL/9.3/lib",
                "pkglib": "/Library/PostgreSQL/9.3/lib/postgresql",
                "locale": "/Library/PostgreSQL/9.3/share/locale",
                "man": "/Library/PostgreSQL/9.3/share/man",
                "share": "/Library/PostgreSQL/9.3/share/postgresql",
                "sysconf": "/Library/PostgreSQL/9.3/etc/postgresql"
        },
        "flags": {
                "cpp": "-I/opt/local/20140109/include/libxml2 -I/usr/local/include/libxml2 -I/usr/local/include",
                "c": "-isysroot /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.6.sdk -mmacosx-version-min=10.5 -headerpad_max_install_names -arch i386 -arch x86_64 -Wall -Wmissing-prototypes -Wpointer-arith -Wdeclaration-after-statement -Wendif-labels -Wmissing-format-attribute -Wformat-security -fno-strict-aliasing -fwrapv",
                "ld": "-L../../../src/common -L/usr/local/lib -L/opt/local/20140109/lib -Wl,-dead_strip_dylibs"
        },
        "libs": [
                "lpgport",
                "lpgcommon",
                "lxslt",
                "lxml2",
                "lpam",
                "lssl",
                "lcrypto",
                "lgssapi_krb5",
                "lz",
                "ledit",
                "lm"
        ],
        "version": {
                "major": 9,
                "minor": 3,
                "patch": 4,
                "fork": "PostgreSQL"
        },
        "pgxs": "/Library/PostgreSQL/9.3/lib/postgresql/pgxs/src/makefiles/pgxs.mk",
        "configure": {
                "prefix": "/Users/buildfarm/pginstaller_2.auto/server/staging/osx",
                "with-ldap": true,
                "with-openssl": true,
                "with-perl": true,
                "with-python": true,
                "with-tcl": true,
                "with-bonjour": true,
                "with-pam": true,
                "with-krb5": true,
                "enable-thread-safety": true,
                "with-libxml": true,
                "with-ossp-uuid": true,
                "with-includes": "/usr/local/include/libxml2:/usr/local/include:/usr/local/include/security",
                "docdir": "/Users/buildfarm/pginstaller_2.auto/server/staging/osx/doc/postgresql",
                "with-libxslt": true,
                "with-libedit-preferred": true,
                "with-gssapi": true,
                "CFLAGS": "-isysroot /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.6.sdk -mmacosx-version-min=10.5 -headerpad_max_install_names -arch i386 -arch x86_64",
                "LDFLAGS": "-L/usr/local/lib"
        },
        "cc": "gcc"
}
```
