/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company and Eclipse Dirigible contributors
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v2.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-FileCopyrightText: 2022 SAP SE or an SAP affiliate company and Eclipse Dirigible contributors
 * SPDX-License-Identifier: EPL-2.0
 */
/**
 * Class: mxGenericChangeCodec
 *
 * Codec for <mxValueChange>s, <mxStyleChange>s, <mxGeometryChange>s,
 * <mxCollapseChange>s and <mxVisibleChange>s. This class is created
 * and registered dynamically at load time and used implicitely
 * via <mxCodec> and the <mxCodecRegistry>.
 *
 * Transient Fields:
 *
 * - model
 * - previous
 *
 * Reference Fields:
 *
 * - cell
 * 
 * Constructor: mxGenericChangeCodec
 *
 * Factory function that creates a <mxObjectCodec> for
 * the specified change and fieldname.
 *
 * Parameters:
 *
 * obj - An instance of the change object.
 * variable - The fieldname for the change data.
 */
var mxGenericChangeCodec = function(obj, variable)
{
	var codec = new mxObjectCodec(obj,  ['model', 'previous'], ['cell']);

	/**
	 * Function: afterDecode
	 *
	 * Restores the state by assigning the previous value.
	 */
	codec.afterDecode = function(dec, node, obj)
	{
		// Allows forward references in sessions. This is a workaround
		// for the sequence of edits in mxGraph.moveCells and cellsAdded.
		if (mxUtils.isNode(obj.cell))
		{
			obj.cell = dec.decodeCell(obj.cell, false);
		}

		obj.previous = obj[variable];

		return obj;
	};
	
	return codec;
};

// Registers the codecs
mxCodecRegistry.register(mxGenericChangeCodec(new mxValueChange(), 'value'));
mxCodecRegistry.register(mxGenericChangeCodec(new mxStyleChange(), 'style'));
mxCodecRegistry.register(mxGenericChangeCodec(new mxGeometryChange(), 'geometry'));
mxCodecRegistry.register(mxGenericChangeCodec(new mxCollapseChange(), 'collapsed'));
mxCodecRegistry.register(mxGenericChangeCodec(new mxVisibleChange(), 'visible'));
mxCodecRegistry.register(mxGenericChangeCodec(new mxCellAttributeChange(), 'value'));
