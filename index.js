const fs = require('fs')

class Directory{
    constructor(name = '', path = '.') {
        this.name = name
        this.path = path
        this.subdirectories = []
        this.files = []

        this.flag = false
    }

    read() {
        let directory, path
        for(const name of fs.readdirSync(this.path)){
            path = `${this.path}/${name}`
            if(fs.lstatSync(path).isDirectory()){
                directory = new Directory(name, path)
                this.subdirectories.push(directory)
                directory.read()
            }
            else{
                let splittedName = name.split('.')
                if(['h', 'cpp'].includes(splittedName[splittedName.length - 1])){
                    this.files.push(name)  
                }
                
                if(name == 'CMakeLists.txt'){
                    this.flag = true
                } 
            } 
        }
    }

    cmakeEntry(varName) {
        let entry = ''
        for(const dir of this.subdirectories){
            entry += `add_subdirectory(${dir.name})\n`
        }
        
        entry += `\nset(${varName}\n\t\$(${varName}}\n`
        
        for(const fileName of this.files){
            entry += `\t\${CMAKE_CURRENT_SOURCE_DIR}/${fileName}\n`
        }

        entry += '\tPARENT_SCOPE)'

        return entry
    }

    writeCmake(varName) {
        fs.writeFileSync(this.path + '/' + 'CMakeLists.txt', this.cmakeEntry(varName))

        for(const dir of this.subdirectories){
            dir.writeCmake(varName)
        }
    }

    write(varName) {
        if (this.flag){
            this.writeCmake(varName)
        }
        else{
            console.log('The directory must contain a CMakeLists.txt')
        }
    }
}

module.exports = Directory