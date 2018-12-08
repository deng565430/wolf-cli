import {help} from 'commander'
import {exists} from 'fs'
import download from '../download'
import chalk from 'chalk'
import co from 'co'
import prompt from 'co-prompt'


module.exports = () => {
    co(function *() {
// 根据输入，获取项目名称
        let projectName = yield prompt('项目名称：')

        if (!projectName) {  // project-name 必填
            // 相当于执行命令的--help选项，显示help信息，这是commander内置的一个命令选项
            help()
            return
        }

        exists(projectName, function (exists) {
            if (exists) {
                console.log(chalk.red(`项目${projectName}已经存在`))
                process.exit()
            } else {
                download(projectName)
                    .then(target => process.exit())
                    .catch(err => console.log(err))
            }
        });
    })
}
