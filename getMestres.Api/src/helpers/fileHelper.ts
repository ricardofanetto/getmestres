import * as fs from 'fs'
import * as jimp from 'jimp'

import variables from '../configuration/config';
import { UtilsHelper } from './utilHeper';

export class FileHelper {

    static async writePicture(base64Data: string): Promise<string> {
        try {

            if (base64Data.indexOf('base64') == -1)
                return base64Data

            //Add 7 caracteres for discont to word base64 and ,
            let positionEndStringIdentifyBase64: number = (base64Data.indexOf('base64') + 7)
            let _base64Data = base64Data.substr(positionEndStringIdentifyBase64)

            let _directory = variables.folderStorage
            let dirExistis = await fs.existsSync(_directory)

            if (!dirExistis)
                await fs.mkdirSync(_directory)

            let filename = `${UtilsHelper.GenerateUniqueHash}.jpg`
            let fileNamePath = `${_directory}/${filename}`

            await fs.writeFileSync(fileNamePath, _base64Data, 'base64')
            console.log('File Saved in', fileNamePath)

            let jimpResult = await jimp.read(fileNamePath)
            jimpResult.quality(parseInt(variables.pictureQuality.toString())).write(fileNamePath)
            return filename

        } catch (error) {
            console.log('Error save file, description: ', error)
            return ''
        }
    }
}

