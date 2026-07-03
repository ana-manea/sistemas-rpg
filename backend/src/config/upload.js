export const uploadConfig = {
  maxFileSize: Number(process.env.MAX_FILE_SIZE || 10 * 1024 * 1024),
  templateDirectory: process.env.TEMPLATE_DIRECTORY || 'storage/templates',
};
