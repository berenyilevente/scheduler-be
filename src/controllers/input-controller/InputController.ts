import { InputModel } from '@/models';
import { getErrorMessage, InputArgs } from '@/utils';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const getInputController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const inputs: InputArgs[] = await InputModel.find();
    res.status(200).json(inputs);
  } catch (error: any) {
    res.status(404).json({ message: getErrorMessage(error) });
  }
};

export const postInputController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const input = req.body;
  const newInput = new InputModel(input);

  try {
    await newInput.save();
    res.status(201).json(newInput);
  } catch (error) {
    res.status(209).json({ message: getErrorMessage(error) });
  }
};

export const deleteInputController = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (id === undefined) {
    return res.status(404).send('ID undefined');
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No input field with that id');
  }

  try {
    await InputModel.findByIdAndRemove(id);
    res.json({ message: 'Input deleted successfully' });
  } catch (error) {
    res.status(209).json({ message: getErrorMessage(error) });
  }
};
